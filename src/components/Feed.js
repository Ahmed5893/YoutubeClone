import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { Fetch } from "../utilities/Fetch";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);


  useEffect(() => {
     Fetch(`search?part=snippet&q=${selectedCategory}`)
.then((data) => {setVideos(data.items);console.log(data.items);})
    
    
  
    return () => {
      console.log('clean up')
    }
  }, [selectedCategory])
  
  return (
    <Stack
      sx={{ flexDirection: { sx: "column", md: "row" }, background: "#000" }}
    >
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography
          variant="body2"
          className="copyright"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023
        </Typography>
      </Box>
      <Box p={3} sx={{flex:2,height:'90vh',overflowY:'auto'}}>
        <Typography variant="h4" fontWeight='bold' mb={2} sx={{color:'#fff'}}>
       {selectedCategory} <span style={{color:'#F31503'}}>Videos</span>
       </Typography>
       <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
