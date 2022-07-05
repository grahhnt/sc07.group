import SoundCloudIcon from "../components/SoundCloudIcon";
import SpotifyIcon from "../components/SpotifyIcon";
import MastodonIcon from "../components/MastodonIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArtstationIcon from "../components/ArtstationIcon";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
};
