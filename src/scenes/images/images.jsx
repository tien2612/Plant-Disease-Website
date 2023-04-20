import React, { useState, useEffect } from 'react';
import ListItem from '../../components/Images/ListItem';
import Header from '../../components/Header';
import { Box, Pagination, Stack } from "@mui/material";
import { collection, query, getDocs } from "firebase/firestore";
import { firestoredb } from '../../components/Firebase/firebase';

const Images = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState([]);

  // fetch data from firestore and store into details
  const imageData = async () => {
    const q = query(collection(firestoredb, "images"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItems(data);
    console.log(data);
  };
  
  useEffect(() => {
    imageData();
  }, []);

  // const items = {
  //   "2023-04-19": {
  //       "healthy": [
  //           {
  //               "status": "healthy",
  //               "item": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F01b32971-5125-4982-98e2-22daa9ae864a___RS_HL%207977.jpg?alt=media&token=32f42348-d31d-4178-ad13-43e4cad73cc4"
  //           },
  //           {
  //               "status": "healthy",
  //               "item": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F07778a5c-8037-425f-aa83-d10b1e1d5db4___RS_HL%207269.jpg?alt=media&token=91f7367e-47d2-4de1-a2df-74603b2e777f"
  //           }
  //       ],
  //       "rust": [
  //         {
  //             "status": "rust",
  //             "item": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F04da297e-5238-41b1-a8a0-0c87c6c2f21f___FREC_C.Rust%204394_new30degFlipLR.jpg?alt=media&token=91c8e884-e0d5-4d75-806c-647bee73e9aa"
  //         }
  //     ]
  //   },
  //   "2023-04-15": {
  //       "rust": [
  //           {
  //               "status": "rust",
  //               "item": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F04da297e-5238-41b1-a8a0-0c87c6c2f21f___FREC_C.Rust%204394_new30degFlipLR.jpg?alt=media&token=91c8e884-e0d5-4d75-806c-647bee73e9aa"
  //           }
  //       ]
  //   }
  // }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const keys = Object.keys(items);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKeys = keys.slice(startIndex, endIndex);
  const currentItems = currentKeys.map(key => items[key]);

  return (
    <Box m="20px">
      <Header title="Images Date Picker" subtitle="Choose your date" />
      <Stack spacing={2}>
      {currentKeys.map(key => (
        <ListItem date={key} items={items[key]} />
      ))}
          
    </Stack>
      <Pagination
        count={Math.ceil(keys.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="secondary"
        sx={{
          p: '20px'
        }}
      />
    </Box>
  );  
};

export default Images;