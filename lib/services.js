import SoundCloudIcon from "../components/SoundCloudIcon";
import SpotifyIcon from "../components/SpotifyIcon";
import MastodonIcon from "../components/MastodonIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArtstationIcon from "../components/ArtstationIcon";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "../components/TikTokIcon";
import TwitchIcon from "../components/TwitchIcon";

export const services = {
  instagram: {
    name: "Instagram",
    color: "#cc2366",
    icon: InstagramIcon,
    emoji: ":instagram:",
  },
  youtube: {
    name: "YouTube",
    color: "#ff0000",
    icon: YouTubeIcon,
    emoji: ":yt:",
  },
  soundcloud: {
    name: "SoundCloud",
    color: "#FE5000",
    icon: SoundCloudIcon,
    emoji: ":soundcloud:",
  },
  twitter: {
    name: "Twitter",
    color: "#1DA1F2",
    icon: TwitterIcon,
    emoji: ":twitter:",
  },
  mastodon: {
    name: "Mastodon",
    color: "#6364ff",
    icon: MastodonIcon,
    emoji: ":mastodon:",
  },
  spotify: {
    name: "Spotify",
    color: "#1DB954",
    icon: SpotifyIcon,
    emoji: ":spotify:",
  },
  artstation: {
    name: "ArtStation",
    color: "#13AFF0",
    icon: ArtstationIcon,
    emoji: ":artstation:",
  },
  more: {
    name: "More",
    color: "#ffffff",
    icon: MoreHorizIcon,
  },
  twitch: {
    name: "Twitch",
    color: "#6441a5",
    icon: TwitchIcon,
  },
  tiktok: {
    name: "TikTok",
    color: "#ff0050",
    icon: TikTokIcon,
    buttonStyle: {
      "&:hover": {
        boxShadow: "2px 2px 0 #ff0050, -2px -2px 0 #00f2ea",
        borderTopColor: "#00f2ea",
        borderLeftColor: "#00f2ea",
        borderBottomColor: "#ff0050",
        borderRightColor: "#ff0050",
      },
    },
  },
};
