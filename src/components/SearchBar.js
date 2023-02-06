import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search, StickyNote2 } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius:'20px',
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5, },
        
      }}
    >
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
      <IconButton type="submit" sx={{ p:"10px", color: "red",position:{xs:'absolute',md:'relative'},right:{xs:'15px'} }} aria-label='search'>
        <Search  />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
