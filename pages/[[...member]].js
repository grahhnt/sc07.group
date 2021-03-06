import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import color from "color";
import styled from "@emotion/styled";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import TikTokIcon from "../components/TikTokIcon";
import MastodonIcon from "../components/MastodonIcon";
import Confetti from "react-confetti";
import { useRouter } from "next/router";
import { getPeople } from "../lib/members";
import { services } from "../lib/services";
import { deepmerge } from "@mui/utils";
import TwitchIcon from "../components/TwitchIcon";

const ButtonBase = ({ variant, children, sx, icon, ...props }) => {
  if (!sx) sx = {};

  var style = {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#4c4b4b",
    margin: "5px",
    padding: "10px",
    position: "relative",
    transition: "border-color 0.5s, color 0.5s, box-shadow 0.5s",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "#ddd",

    display: "flex",
    alignItems: "center",

    ">svg": {
      mr: 0.5,
    },
  };

  style["&:hover"] = services[variant]
    ? {
        color: services[variant].color,
        borderColor: services[variant].color,
      }
    : {};
  if (services[variant]?.buttonStyle) {
    style = { ...style, ...services[variant]?.buttonStyle };
  }
  style = { ...style, ...sx };

  return (
    <Box sx={style}>
      <a
        {...props}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></a>
      {icon}
      <Box className="content">{children}</Box>
    </Box>
  );
};

export default function Home({ pathActivePerson, people }) {
  const router = useRouter();
  const [activePerson, setActivePerson] = useState(pathActivePerson);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMastodonInfo, setShowMastodonInfo] = useState(false);

  useEffect(() => {
    const routerName = router.query.member?.[0].toLowerCase();
    setActivePerson(
      people.find(
        (person) =>
          person.name.toLowerCase() === routerName ||
          person.aliases.indexOf(routerName) > -1
      )
    );
  }, [router.asPath]);

  useEffect(() => {
    if (activePerson?.confetti) {
      setShowConfetti(true);
    }
  }, [activePerson]);

  const changePerson = (name) => {
    router.push("/" + (name?.toLowerCase() || ""), undefined, {
      shallow: true,
    });
  };

  const Video = ({ video }) => {
    console.log({ video });
    return (
      <Card>
        <CardActionArea href={"https://youtu.be/" + video.id} target="_blank">
          <CardMedia
            component="img"
            sx={{ width: "100%" }}
            image={video.thumbnails.medium.url}
          />
          <CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              sx={{ mb: 1 }}
            >
              {moment(video.publishedAt).fromNow()}
            </Typography>
            <Typography
              component="div"
              variant="h5"
              sx={{ display: "flex", gap: 1 }}
            >
              {video.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <>
      <Head>
        {activePerson?.name ? (
          <>
            <title>{activePerson.name + " - sc07.group"}</title>
            <meta name="og:site_name" content="sc07.group" />
            <meta
              name="description"
              content={activePerson.name + " makes things; check them out!"}
            />
            <meta
              name="og:description"
              content={activePerson.name + " makes things; check them out!"}
            />
            <meta property="og:title" content={activePerson.name} />
            <meta property="og:type" content="profile" />
            <meta property="og:image" content={activePerson.header} />
          </>
        ) : (
          <>
            <title>sc07.group</title>
            <meta name="description" content="we make things" />
            <meta name="og:description" content="we make things" />
            <meta property="og:title" content="sc07.group" />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={people[Math.floor(Math.random() * people.length)].header}
            />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {activePerson &&
          activePerson.social.map((social) => {
            return (
              <>
                <a href={social.url} rel="me"></a>
              </>
            );
          })}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            flexDirection: "column",
          }}
        >
          <img
            src={"https://sc07.company/img/logos/white.png"}
            style={{ width: "50%" }}
          />
          <Stack direction="row" flexWrap="wrap" justifyContent="center">
            <ButtonBase
              variant="mastodon"
              icon={<MastodonIcon />}
              href="https://watch.sc07.group/mastodon"
              target="_blank"
              rel={!activePerson?.name ? "me" : undefined}
              onClick={(e) => {
                if (!e.shiftKey && !e.ctrlKey) {
                  e.preventDefault();
                  setShowMastodonInfo(true);
                }
              }}
            >
              Mastodon
            </ButtonBase>
            <ButtonBase
              variant="instagram"
              icon={<InstagramIcon />}
              href="https://watch.sc07.group/instagram"
              target="_blank"
            >
              Instagram
            </ButtonBase>
            <ButtonBase
              variant="youtube"
              icon={<YouTubeIcon />}
              href="https://watch.sc07.group"
              target="_blank"
            >
              YouTube
            </ButtonBase>
            <ButtonBase
              variant="tiktok"
              icon={<TikTokIcon />}
              href="https://watch.sc07.group/tiktok"
              target="_blank"
            >
              TikTok
            </ButtonBase>
            <ButtonBase
              variant="twitch"
              icon={<TwitchIcon />}
              href="https://twitch.tv/sc07_"
              target="_blank"
            >
              Twitch
            </ButtonBase>
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            {people.map((person) => (
              <Box
                key={person.name}
                onClick={() => changePerson(person.name)}
                sx={{
                  width: "110px",
                  height: "110px",
                  position: "relative",
                  cursor: "pointer",
                  "&:hover": {
                    ".overlay": {
                      opacity: 1,
                    },
                    ".image": {
                      backgroundSize: "150%",
                    },
                  },
                }}
              >
                <Box
                  className="image"
                  sx={{
                    backgroundImage: `url(${person.icon})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    transition: "background-size 0.5s",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: 0,
                    transition: "opacity 0.5s",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">{person.name}</Typography>
                    {person.aliases?.map((alias) => (
                      <Typography
                        key={alias}
                        variant="caption"
                        color="text.secondary"
                      >
                        {alias}
                      </Typography>
                    ))}

                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {person.social
                        .filter((a) => !a.hidden)
                        .map((social) => {
                          const { icon: Icon, ...service } =
                            services[social.type];
                          return (
                            <Icon
                              key={social.type}
                              fontSize="inherit"
                              htmlColor={service.color}
                            />
                          );
                        })}
                    </Box>
                  </Box>
                </Box>

                <a
                  href={"/" + person.name.toLowerCase()}
                  onClick={(e) => {
                    if (!e.shiftKey && !e.ctrlKey) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></a>

                {person.confetti && showConfetti && (
                  <Confetti
                    width="100%"
                    height="100%"
                    numberOfPieces={20}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 5 }}>
            &copy; 2021 - 2022 <a href="https://sc07.company">sc07 Inc.</a>
          </Typography>
        </Box>

        <Dialog
          open={Boolean(activePerson)}
          onClose={() => changePerson(null)}
          fullWidth
        >
          <DialogContent>
            {activePerson ? (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${activePerson.header})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 9999,
                  }}
                />
                <Stack direction="column" spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "200px",
                    }}
                  >
                    <Tooltip title={activePerson.name + "'s text color"}>
                      <Box
                        className="image"
                        sx={{
                          backgroundImage: `url(${activePerson.icon})`,
                          backgroundSize: "100%",
                          backgroundPosition: "center",
                          width: "110px",
                          height: "110px",
                          transition: "background-size 0.5s",
                          mr: 2,
                        }}
                      />
                    </Tooltip>

                    <Box>
                      <Typography variant="h3">{activePerson.name}</Typography>
                      <Typography variant="h6" color="text.secondary">
                        {activePerson.aliases.join(", ")}
                      </Typography>
                      <Button
                        href={activePerson.mastodon.url}
                        target="_blank"
                        rel="me"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                      >
                        More
                      </Button>
                    </Box>
                  </Box>

                  {activePerson.mastodon.note && (
                    <>
                      <Divider>About Me</Divider>

                      <Box
                        dangerouslySetInnerHTML={{
                          __html: activePerson.mastodon.note,
                        }}
                      />
                    </>
                  )}

                  <Divider>Socials</Divider>

                  <Box>
                    <Grid container spacing={2}>
                      {activePerson.social.map((social) => {
                        const { icon: Icon, ...service } =
                          services[social.type];

                        return (
                          <Grid
                            item
                            xs={12}
                            md={6}
                            hidden={social.hidden}
                            key={social.type + "|" + social.url}
                          >
                            <Card>
                              <CardActionArea
                                sx={{ display: "flex" }}
                                href={social.url}
                                target="_blank"
                                rel="me"
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    fontSize: 60,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Icon
                                    fontSize="inherit"
                                    htmlColor={service.color}
                                    sx={{ m: 2 }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <CardContent
                                    sx={{
                                      flex: "1 0 auto",
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography component="div" variant="h5">
                                      {service.name}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      color="text.secondary"
                                      component="div"
                                    >
                                      {social.text}
                                    </Typography>
                                  </CardContent>
                                </Box>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>

                  {activePerson.videos && (
                    <>
                      <Divider>Videos</Divider>

                      <Box>
                        <Grid container spacing={2}>
                          {activePerson.videos.map((video) => (
                            <Grid item xs={12} md={6}>
                              <Video video={video} />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </>
                  )}
                </Stack>
              </>
            ) : (
              ""
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={showMastodonInfo}
          onClose={() => setShowMastodonInfo(false)}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <MastodonIcon sx={{ mr: 1, color: services.mastodon.color }} />
            Mastodon
          </DialogTitle>
          <DialogContent>
            <Button
              href="https://joinmastodon.org"
              target="_blank"
              endIcon={<OpenInNewIcon />}
            >
              Mastodon
            </Button>
            is a federated social media build with ActivityPub.
            <br />
            We're adopting this service and think you guys should too!
          </DialogContent>
          <DialogActions>
            <Button
              href="https://mastodon.sc07.group/@sc07"
              target="_blank"
              rel="me"
              startIcon={<MastodonIcon />}
              variant="contained"
            >
              Follow @sc07
            </Button>
            <Button
              href="https://mastodon.grants.cafe"
              target="_blank"
              startIcon={<PersonAddAlt1Icon />}
              variant="outlined"
            >
              Get a Mastodon account
            </Button>
            <Button
              href="https://twitter.com/sc07group"
              target="_blank"
              startIcon={<TwitterIcon />}
            >
              Twitter
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const peopleWithMastodon = await getPeople();

  return {
    props: {
      pathActivePerson:
        peopleWithMastodon.find(
          (person) =>
            person.name.toLowerCase() === params.member?.[0] ||
            person.aliases.indexOf(params.member?.[0]) > -1
        ) || null,
      people: peopleWithMastodon,
    },
  };
}
