import cheerio from "cheerio";
import { services } from "./services";

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
    }
  }

  return peopleWithMastodon;
}

const people = [
  {
    mastodon: "mastodon.sc07.group/108547269065312009", // domain/userid
    name: "grant",
    aliases: [],
    icon: "https://sc07.group/files/avatars/grant.png",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108576041532342503",
    name: "Sugar",
    aliases: ["brownsugahh"],
    confetti: true,
    icon: "https://sc07.group/files/avatars/emma.jpg",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108576055112893608",
    name: "Declan",
    aliases: [],
    icon: "https://sc07.group/files/avatars/declan.new.png",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108576058148274811",
    name: "Kayway",
    aliases: [],
    icon: "https://sc07.group/files/avatars/kayway.jpeg",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108596299437725241",
    name: "Rivers",
    aliases: [],
    icon: "https://sc07.group/files/avatars/rivers.jpg",
    social: [
      {
        type: "more",
        text: "Carrd",
        url: "https://riverseltor.carrd.co",
      },
    ],
  },
  {
    mastodon: "mastodon.sc07.group/108587155559934423",
    name: "Ethan",
    aliases: [],
    icon: "https://sc07.group/files/avatars/ethan.png",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108587170679521728",
    name: "Carter",
    aliases: [],
    icon: "https://sc07.group/files/avatars/carter.png",
    social: [],
  },
  {
    mastodon: "mastodon.sc07.group/108587200425908086",
    name: "Conner",
    aliases: [],
    icon: "Https://sc07.group/files/avatars/conner.jpg",
    social: [],
  },
];
