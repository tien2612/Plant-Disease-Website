import React from "react";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";

const getFilteredImages = (items, status) => {
  if (!items[status]) {
    return [];
  }

  return items[status].map(item => item.item);
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

  return (
    <div>
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
    </div>
  );
}

export default ImageClassifier;