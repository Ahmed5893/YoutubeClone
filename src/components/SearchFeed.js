import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {Videos} from "./";
import { Fetch } from "../utilities/Fetch";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    Fetch(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
      console.log(data.items);
    });

    return () => {
      console.log("clean up");
    };
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ flex: 2, height: "90vh", overflowY: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "#fff" }}>
        Search Results For:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> Videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
