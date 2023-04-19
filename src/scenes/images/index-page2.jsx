import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestoredb } from "../../components/Firebase/firebase";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const getFilteredImages = (groupedData, statusQuery, date) => {
  if (!groupedData[date]) 
    return []; 
  
    // Get the array of items for the specified date and status query
    const items = groupedData[date][statusQuery] || [];
    
    // Filter the items array based on the status query
    const filteredItems = items.filter(item => item.status === statusQuery);
    
    // Extract the image URLs from the filtered items and return them as an array
    return filteredItems.map(item => item.item);
}

const ImageClassifier = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate({ pathname: "/images" });
  };
  // get the query status
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryStatus = urlParams.get('status')
  
  const status = queryStatus.toLowerCase();
  const date = '2023-04-19';
  // fetch data from firestore and store into details
  const userData = async () => {
    const q = query(collection(firestoredb, "images"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
    // console.log(data);
  };
  
  useEffect(() => {
    userData();
  }, []);

  // group the data by both date and status
  const groupedData = details.reduce((acc, row) => {
    const date = row.date;
    const status = row.status;
    const item = row.imageUrl;
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][status]) {
      acc[date][status] = [];
    }
    acc[date][status].push({ status, item });
    return acc;
  }, {});
  
  const filteredImages = getFilteredImages(groupedData, status, date);
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