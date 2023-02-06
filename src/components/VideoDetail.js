import { useState, useEffect } from "react";
import { Fetch } from "../utilities/Fetch";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import { Videos } from "./";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    Fetch(`videos?part=snippet,statisticst&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    Fetch(`search?part=snippet&relatedtoVideoId&id=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
    return () => {
      console.log("clean up");
    };
  }, [id]);
  if (!videoDetail?.snippet) {
    return "Loading...";
  }
  console.log(videoDetail);

  return (
    <Box minHeight="95vh" sx={{ background: "#000" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
              {videoDetail.snippet.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              py={1}
              px={2}
              sx={{ color: "#fff" }}
            >
              <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  sx={{position:'absolute',bottom:{xs:'5px',md:'30px'},left:'20px'}}
                >
                  {videoDetail.snippet.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px"}}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap='20px' alignItems="center" sx={{transform:{xs:'TranslateY(-30px)',md:'TranslateY(-50px)'}}}>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
