import fs from "fs";

var Cache = {};
export const getVideo = async (id) => {
  // if (
  //   Cache[id] &&
  //   new Date().getTime() - Cache[id]._timestamp.getTime() <
  //     parseInt(process.env.YOUTUBE_CACHE_TIMEOUT_MS)
  // ) {
  //   return Cache[id].data;
  // }

  var data = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
  );
  if (data.status == 200) {
    data = (await data.json()).items?.[0]?.snippet;

    if (data) {
      Cache[id] = {
        data,
        _timestamp: new Date(),
      };
    }
  } else {
    console.warn("Failed to get youtube video!", data.status, data.statusText);
  }

  return Cache[id]?.data;
};

const videos = JSON.parse(fs.readFileSync("data/videos.json", "utf8"));
