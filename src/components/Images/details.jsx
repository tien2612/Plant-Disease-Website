import React from "react";
import { Box, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";

const getFilteredImages = (items, status) => {
  if (!items[status]) {
    return [];
  }

  return items[status].map(item => item.imageUrl);
}

const ImageClassifier = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // // get the location status
  const queryStatus = location.state.status;
  const date = location.state.date;
  const items = location.state.items;

  const status = queryStatus.toLowerCase()
  console.log(status, date, items);

  const handleBackButtonClick = () => {
    navigate("/images/box_images", {
      state: location.state,
    });
  };

  // get all images url filter by status
  const filteredImages = getFilteredImages(items, status);
  console.log(filteredImages);

  const info_date = new Date(date).toLocaleDateString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box m="20px">
        <Header title={queryStatus + " Images"} subtitle= {info_date}/>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px'}}>
        <ArrowBackIcon 
          onClick={() => {
            handleBackButtonClick();
          }}
        />
        <span style={{ display: 'inline-block', textAlign: 'center', lineHeight: '24px', fontSize: '25px', marginLeft: '5px' }}>Quay lại</span>
      </div>
      
      <Grid container spacing={1} sx={{ width: "100%" }}>
        {filteredImages.map((image, id) => (
          <Grid key={id} item xs={4}>
            <img
              src={image}
              alt={`Image ${id}`}
              width="80%"
              style={{ marginLeft: id % 3 === 0 ? '50px' : '50px' }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ImageClassifier;