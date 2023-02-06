import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { Fetch } from "../utilities/Fetch";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    Fetch(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetails(data?.items[0])
    );
    Fetch(`search?channelId=${id}&part=snippet&order=date`).then((data) =>
      setVideos(data?.items)
    );

    return () => {
      console.log("clean up");
    };
  }, [id]);

  return (
    <Box minHeight="95vh" sx={{background:'#000'}}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,35,35,1) 24%, rgba(173,166,170,0.9570421918767507) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }}/>
          <Videos videos={videos} />
        
      </Box>
    </Box>
  );
};

export default ChannelDetail;
