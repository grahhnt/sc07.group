import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { services } from "./services";
import { getVideo } from "./videos";

var Cache = {};
const getMastodon = async (host, id) => {
  if (
    Cache[host + "/" + id] &&
    new Date().getTime() - Cache[host + "/" + id]._timestamp.getTime() <
      parseInt(process.env.MASTODON_CACHE_TIMEOUT_MS)
  ) {
    return Cache[host + "/" + id].data;
  }

  var data = await fetch(`https://${host}/api/v1/accounts/${id}`);
  if (data.status == 200) {
    data = await data.json();
    Cache[host + "/" + id] = {
      data,
      _timestamp: new Date(),
    };
  } else {
    console.warn(
      "Failed to get user from Mastodon!",
      data.status,
      data.statusText
    );
  }

  return Cache[host + "/" + id].data;
};

export async function getPeople() {
  var peopleWithMastodon = JSON.parse(JSON.stringify(people));

  for (var person of peopleWithMastodon) {
    if (person.mastodon) {
      const [host, id] = person.mastodon.split("/");
      person.mastodon = await getMastodon(host, id);

      person.name = person.mastodon.display_name || person.mastodon.username;
      // if display name isn't username at all, add username to list of aliases
      if (
        person.mastodon.display_name &&
        person.mastodon.display_name.toLowerCase() != person.mastodon.username
      ) {
        person.aliases = [person.mastodon.username, ...person.aliases];
      }

      person.icon = person.mastodon.avatar_static;
      person.header = person.mastodon.header_static;

      const aliasField = person.mastodon.fields.find(
        (field) => ["aka", "aliases"].indexOf(field.name.toLowerCase()) > -1
      );
      if (aliasField) {
        person.aliases = [...aliasField.value.split(", "), ...person.aliases];
      }

      const links = person.mastodon?.fields
        .filter((field) => {
          return Object.keys(services).find(
            (service) => field.name.indexOf(services[service].emoji) > -1
          );
        })
        .map((field) => {
          const service = Object.keys(services).find(
            (service) => field.name.indexOf(services[service].emoji) > -1
          );
          var link = field.value;

          if (link.indexOf("<") == 0) {
            const $ = cheerio.load(link);
            link = $("a").first().attr("href");
          }

          return {
            type: service,
            text: field.name.replace(services[service].emoji, "").trim(),
            url: link,
          };
        });

      person.social = [
        {
          type: "mastodon",
          url: person.mastodon.url,
          hidden: person.mastodon.locked,
        },
        ...links,
        ...person.social,
      ];

      if (person.videos) {
        var videos = [];

        for (const video of person.videos) {
          videos.push({
            ...(await getVideo(video.id)),
            ...video,
          });
        }

        person.videos = videos;
      }
    }
  }

  return peopleWithMastodon;
}

const people = JSON.parse(fs.readFileSync("data/members.json", "utf8"));
