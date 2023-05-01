import React, { useState, useEffect } from 'react';
import ListItem from '../../components/Images/ListItem';
import Header from '../../components/Header';
import { Box, Pagination, Stack } from "@mui/material";
import { collection, query, getDocs } from "firebase/firestore";
import { firestoredb } from '../../components/Firebase/firebase';
import UploadForm from './upload';

const Images = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [originItems, setItems] = useState([]);

    // fetch data from firestore and store into details
    // const imageData = async () => {
    //   const q = query(collection(firestoredb, "images"));

    //   const querySnapshot = await getDocs(q);
    //   const data = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setItems(data);
    //   console.log(data);
    // };

    // useEffect(() => {
    //   imageData();
    // }, []);

    // fakeItems is all the collections get from firestore
    const fakeItems = [
        {
            "status": "scab",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faeb5b7cb500f94a0.jpg30d018f6-39f5-4318-9700-eade1e1a73bb?alt=media&token=ebe6ce80-caeb-4d40-b8a9-74f646ef5d40",
            "id": "01XipDVf6I40jen1OIdC"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faedb1485640bcf78.jpgc8b8061b-420e-4c22-83ea-c23579cecb37?alt=media&token=c766603b-a2b9-429d-870a-cfd56a7fb89c",
            "status": "scab",
            "id": "04iNFLHALBGHuqC9etVD"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffb93afc2a5e0200.jpg41121165-49e9-46e6-bbf5-de32b3b51fda?alt=media&token=3bff96fc-26ee-4bf2-89ba-f4320d7043a2",
            "date": "2023-05-06",
            "id": "0OAkyyySoj1GTNy6EsrX"
        },
        {
            "date": "2023-05-06",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff5d8c2801ec40e.jpg18df32a4-7b86-4887-95fd-5eb72d605058?alt=media&token=2e6cae4e-af46-46f9-b878-7b2d9d2c11c7",
            "id": "0WMEvPgUdcvvxW0ewrmz"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5bf9213cb900e62.jpg9d07a440-ef73-434b-b0db-feb47bae66e3?alt=media&token=5e803040-81d7-4e6c-ab49-fb444e0a1e11",
            "date": "2023-05-08",
            "id": "0uTuI3lufnXbeCAOtVsr"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af83f5138aaf825.jpg1aba534a-d0fa-4a2e-a9b8-174c1c615080?alt=media&token=590004ea-d608-48f1-89f9-b3b970f3b95b",
            "status": "scab",
            "date": "2023-05-03",
            "id": "10BJIkz3pBDVKWhi7Orj"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d7ddcd23087a542.jpgb8ec4026-8b0f-4d69-a2b3-4c38c862948d?alt=media&token=6052e34f-71f2-478c-a18d-1c634e139136",
            "status": "healthy",
            "id": "1CfhVZNrYMXKtnDkuCPW"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdfe425be42284b0f.jpg2a66888a-5f27-4e07-88c7-c41d69959c57?alt=media&token=e6ebbe23-796a-40a8-8c58-702e5990bcba",
            "date": "2023-05-10",
            "id": "1HrOWffd27BEUeh2DR3T"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b3b3fa2f425a194.jpg9bd4de9f-65e8-4b23-9052-02bdf94f3c76?alt=media&token=6e9d225f-f59c-4498-93f9-70350af57599",
            "status": "rust",
            "date": "2023-05-01",
            "id": "1Ng7NHY0ftitDPHYV6pq"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffee4804a8d345d1f.jpgc84f7279-fc95-46d3-92f5-89193062430b?alt=media&token=45b61a32-e608-46a3-b26d-8fdfb8408add",
            "status": "complex",
            "date": "2023-05-06",
            "id": "1oO6m67dyCL0pYJjD0Zt"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffffc94e092a59086.jpg54da9d11-22ab-4e27-917d-113ed4054b94?alt=media&token=f600b1b6-05dc-486b-97e2-31508a7888df",
            "status": "rust",
            "id": "21Q3mKWYrJwRSXMxEOfD"
        },
        {
            "date": "2023-05-02",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a3937a9ab9265a5.jpgae8601e9-b88a-4eae-bdd9-6816fa7c227d?alt=media&token=4535baaf-4d60-4f3d-bbee-889dd5b77444",
            "id": "25ECMi4l7hGlfKJwWNiN"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9bb269cb96821a2f.jpgbfa54742-2ec6-4c9f-acc2-9a736a7e9d26?alt=media&token=81db40a2-710f-49e9-80fe-82975bb4f675",
            "date": "2023-05-05",
            "id": "2FuKPgyxBE1RNMUSvMOm"
        },
        {
            "date": "2023-05-06",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff4c0d2d2c202da.jpg491597e3-9517-48f8-bd76-781b007fa5de?alt=media&token=15087a87-110c-4890-8e3e-ff0d601f42cc",
            "id": "2G4DIFQJv1h8fX4KBFNy"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feaf8dc8d013c2d2d.jpg27d96df5-6ae8-41e8-af78-f67d8e5fb308?alt=media&token=cd758705-7ebd-4d70-87bb-6095a3e11db0",
            "date": "2023-05-08",
            "status": "rust",
            "id": "2Hn7Oh8Oe3EBzm2xbOrW"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a9237d6a86ba167.jpg03ae5d0d-6f31-4542-ad39-c9083787bf99?alt=media&token=203cc96f-a586-40ef-821d-6ee12f5ecbce",
            "status": "rust",
            "date": "2023-05-01",
            "id": "2IxEeD4k0gME7jtqWUQa"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8afab5369497d092.jpg449b0e99-938b-4991-862b-975f15eb9c8e?alt=media&token=4853c4a6-1590-4b70-9c91-309d64278c45",
            "date": "2023-05-03",
            "id": "2MGf8680H7JQmfQXQK8S"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5b05ad6808b4a6f.jpg5cc32f3b-0418-4438-999d-6302740a39ee?alt=media&token=0571ba01-45a9-4048-97cd-4301774b20d1",
            "date": "2023-05-08",
            "status": "scab",
            "id": "2NahLgmYo7etusmYOFpM"
        },
        {
            "status": "scab",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae419e425abf651c.jpg8456e4e4-7a5d-44f1-8208-dc84f45358ca?alt=media&token=9ad5bbc8-1c72-4bf8-b795-e94a629026cb",
            "id": "2dPUlPv5NzvWrwsEbfDY"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c5a2de3a45a9729.jpg12da2d10-09e4-4a86-b803-6cb35491f7b6?alt=media&token=1c911cfd-a663-4a72-b1f8-840f63618443",
            "date": "2023-05-05",
            "id": "2lOj7ML7ynhYar1er4lV"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b643cd594c80fcd.jpgcd20e4a4-2f5c-4fb0-8331-db77a3ba74d2?alt=media&token=ad439776-39ae-4f8f-a77e-11dc268490ab",
            "status": "scab",
            "id": "2u03af6g3O4jawPQb2tY"
        },
        {
            "date": "2023-05-10",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5038b5576c583f4.jpgfca4ff70-2f59-4873-bacc-dde439d48ce8?alt=media&token=640ca39c-e220-4042-bb25-6a279e5bd308",
            "id": "39g5Jp3cgeZ0GVVbxM4k"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd4484e8d7bd8b34a.jpg12109da1-d7ca-4930-bd01-6f1694c9e642?alt=media&token=cda9635d-209a-4669-90c5-4456c447c531",
            "status": "complex",
            "id": "3GFUyymj2m0zeW93gwy7"
        },
        {
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aa7d6526ba664b2.jpg7f8d53a1-0b29-4d48-aa53-1081bbbc720e?alt=media&token=92134714-25aa-4c6b-abc7-fc42b27b24a5",
            "status": "rust",
            "id": "3JOTj3foCAqrj5EEQxqI"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae95c30fcd622c71.jpg841de1b8-f1f1-4b6f-b20f-67940c3bf62a?alt=media&token=28b17724-70fd-4b58-8cd6-6e0450159b53",
            "date": "2023-05-10",
            "id": "3z83ap4Vb11cbwVyrd1z"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d90616795187aed.jpgbb76f905-2407-49da-8e07-fe553a171b78?alt=media&token=f1c12596-d5a4-4218-b019-455c5f38c642",
            "status": "healthy",
            "id": "3zC0sGHz0UgfRXmXXIYW"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a1ef092b3b6a6d2.jpge217d5ba-459d-4e03-b116-d6a1e327d36f?alt=media&token=cdf5b555-2832-4e92-91d5-2f14e7840851",
            "date": "2023-05-02",
            "id": "42tPpG89bERMO4PiVwGI"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c62dc37c5ba4709.jpg6807a0da-1419-4611-a78c-c4a44fcdf83a?alt=media&token=95607e2f-6731-40c2-a36e-80522bcdb2c6",
            "id": "4D5criKK6ggNu9Uw085T"
        },
        {
            "date": "2023-05-08",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5cac584c2bcd32c.jpg2f4e674a-e9e4-44ee-ba12-0267b604c1b3?alt=media&token=4dcccdaf-2de4-4787-a901-1f305cc4fe98",
            "id": "4LP2fLeqHYNnUu0uJdan"
        },
        {
            "status": "scab",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9a9182989ebe6ce3.jpg8d45f9bb-74fc-42fb-b780-d1643363e4dc?alt=media&token=eef0e5bb-96ad-48a7-bb79-a2fe8b016535",
            "id": "4bOOfLZOkSGISh2GSYNE"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae69761d6123a1e9.jpg373f26a7-5c55-4c74-9684-7eb82be29b69?alt=media&token=4be03360-6369-4aac-ba00-b868a71cf77a",
            "date": "2023-05-10",
            "id": "4rk5XDfMYBlBYm7PTuRn"
        },
        {
            "date": "2023-05-10",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa41ac6e329f6565a.jpg277b8dd1-1643-4d58-895d-e37212a284fb?alt=media&token=f69ef82b-e31f-4ad4-b0f4-55511ba2bd6e",
            "id": "54xbYX13RVMdO3io5Kh6"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faeb2940bdcff4a04.jpg03157fd7-ee32-487d-a55b-2e259e6a29fd?alt=media&token=ed038c26-2a93-4319-81ee-7fe224b4bb34",
            "status": "scab",
            "id": "57GnMNjrlGIwOYJPeRUp"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdea2323240e75ee6.jpga0467dd5-40ed-4ca2-9def-28ca484fca1c?alt=media&token=099e96dc-20b9-4fcb-ac57-0295c0e81888",
            "date": "2023-05-10",
            "id": "58VxLOHL1yuk4bt2KwkJ"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8db66ec9883c8d71.jpg2dbf4cee-b903-4aae-9335-985579fd049c?alt=media&token=21263e51-8254-40f2-a502-8cd259d806d3",
            "status": "complex",
            "date": "2023-05-03",
            "id": "5GacCyhlaCXqyn4wZkRO"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F88f05f09be2f1e23.jpgecf3685b-8860-44e7-920c-650a650f6151?alt=media&token=bc01cb5e-ae0e-4999-9f32-1b99c9cbb56d",
            "status": "complex",
            "id": "5VipleVMwuZG0El03imQ"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9de59a9c27c148d3.jpge95c5677-7715-408b-890a-b58fb78148c6?alt=media&token=6b210244-caae-4472-80b9-50fd41a8754c",
            "date": "2023-05-04",
            "id": "5akGqgzEeLxRy8C7qRT5"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8fe8be8196599169.jpg18f6b0c8-af20-4b6b-a717-3986f1987621?alt=media&token=2851844f-13dd-4a94-b3c3-fefea04c61ac",
            "date": "2023-05-03",
            "status": "complex",
            "id": "5cCS4390mLH0aPHNQKUI"
        },
        {
            "status": "rust",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b8a705362baeaea.jpgd56a034e-02b6-41a8-98e0-5f2115e604c8?alt=media&token=7cc308ed-2796-4850-be10-4759ef9fb59f",
            "id": "5lexMVy4WOYcRrSbIlXS"
        },
        {
            "status": "healthy",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a31aebdbc3e1132.jpgfc4f0022-48f5-4be6-b093-981a9237b284?alt=media&token=79f4fb52-9613-478f-a608-d6735b13d85c",
            "id": "5n5QlQqMckJ5JthVTV7m"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d929299e5c96cc5.jpg17bd67ad-3589-46fb-b962-33405e708ac9?alt=media&token=fb80ec56-57e2-46b5-8d32-f319940c1ba4",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "5yoUq1np0l5dro2ExRya"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd03180ff1ff63906.jpgdaa137a9-c6e4-4f7b-bbf7-d4a1d5bc8a5f?alt=media&token=159ce38e-01e6-41ad-a353-cd1fbc09928b",
            "status": "healthy",
            "id": "5zdnySu2702Gx3pQXV13"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aaa6b1bf049fca8.jpg1c182b2b-d712-4de7-8125-d4f1c15428a2?alt=media&token=fc82a013-ff36-4eb7-8be2-a6412f48c479",
            "date": "2023-05-02",
            "id": "66JgG2RKR2o5fVW6NJVN"
        },
        {
            "status": "rust",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a0d7cad7053f18d.jpg581cf9b1-0600-45ed-8843-8aa9eacc34e6?alt=media&token=5b265dd8-cd8c-42c3-8e8d-476ff6be162e",
            "id": "6GcwvBtXaIS70CFmiGCr"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffffb65761200b054.jpg30ed67f4-93a0-4ea8-9a10-9ae0abccf089?alt=media&token=e3f42118-bf0e-4438-aafa-1ffef403584f",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "78FpkvXtQYWT0IVLYaxK"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dd96a6e60863497.jpg1e7ac5cc-8e13-4cf1-b8eb-e395feac4b07?alt=media&token=5b9202dd-9f66-47a6-9f47-4d5e4ccc48f3",
            "id": "78xepuOrtaSXhx93OQDz"
        },
        {
            "date": "2023-05-05",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d5763339584681f.jpg05738ad9-54f5-4ff7-80ca-a22dc3521b0f?alt=media&token=8a784afc-efbc-4536-bd65-67e5cffd7702",
            "id": "7HBnzbahspUiYkSfDDoc"
        },
        {
            "status": "scab",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ad786d2d6c2caca.jpgfd2e2679-cbeb-4e43-9825-333420f3c5e0?alt=media&token=d3cb52c7-a68e-46c2-b7ba-392dd782dcf8",
            "id": "7IpclADh8jzJAl6PTsH8"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9db192eba5fca420.jpgcbc491bd-31bb-482d-b48a-29a87f0af0bc?alt=media&token=ef52f30e-7576-449a-8efd-f970011b4e05",
            "id": "7hVHxO6SejZzbDiSX58A"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd973c60c3961c2cf.jpg45db1799-c0d0-4617-869c-29125f565462?alt=media&token=719f0f05-4d0a-41e7-9c1e-7f73d681bc17",
            "status": "complex",
            "date": "2023-05-10",
            "id": "7tvhsjyeFNwGOliqJnZ3"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d166cddc0b7206b.jpge527b05d-49e7-42cb-b156-66466a7ae92b?alt=media&token=7b03793d-ebfb-472c-9a04-7f9140d6000d",
            "date": "2023-05-05",
            "status": "scab",
            "id": "8BMRiG9m0vjShwr13Wcw"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff8bc02bcb3c8b20.jpgbdc31caa-510d-4b7b-aa31-af8813a407e9?alt=media&token=29848bf9-26a2-40dc-82fa-389bb802772a",
            "status": "complex",
            "date": "2023-05-06",
            "id": "8EctwmzVKa4NIxx3Yvxy"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a8591d2e865f1db.jpgd0c57539-2361-4d8b-bef9-75f8d8bb8a8a?alt=media&token=a5520e96-51cc-4bea-ab91-1da0d9864592",
            "date": "2023-05-01",
            "status": "healthy",
            "id": "8IPym73uzyTYhS0Hm7FM"
        },
        {
            "status": "scab",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9aa9d0db8cfa6d02.jpga4ca8929-15de-4fa6-8761-4dd6551bc736?alt=media&token=8182dd45-d3cd-4a4a-bb72-f1a864145e74",
            "id": "8Mv72cBvT9KrqAMQeYKi"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa14ec61a136f3bd4.jpgdbef0fff-97ed-4713-971c-0f9ba0583ed1?alt=media&token=5af6bb36-f11a-4aa4-af9f-3d1704c27909",
            "id": "8WwiK9y6AikYGRQhGNDu"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe8e0c3c21f00ce.jpgb8c194e0-e9b4-428e-add8-b982b1d6092b?alt=media&token=d553f6a1-378e-431b-b6a7-b9d5529a0f7b",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "8XhEB4RWPdadxoVyXIol"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff32821f4d34b4d0.jpgaacf7aae-9ca6-4ca0-8f72-60b2fc1b5d14?alt=media&token=2b43922f-6f71-434e-b78b-03521685e150",
            "date": "2023-05-06",
            "id": "8bfBzN447IUHBoyu6v6h"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0ca94e9d6353e30.jpgacfb4d13-5803-4010-a3cd-63c457d077f7?alt=media&token=a847dfb9-d1f4-4c98-bec4-b79542650422",
            "date": "2023-05-08",
            "id": "8pTZF7PHEpk88OBD2omj"
        },
        {
            "status": "complex",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdee06fde20e23183.jpga73aca21-db46-4a5a-9288-5eb0fdd61199?alt=media&token=ee4ee406-3bf1-4d4e-b4eb-513add42687a",
            "id": "8q19ZHxx0V78Rm8Wdnt9"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d848dc0afef0ab4.jpg7d58b37a-a4e2-44c4-a930-afffd3de1f2c?alt=media&token=c588f036-367a-485c-a5ef-7b75da6115b2",
            "date": "2023-05-05",
            "id": "8qtdYGu50MZ19AN9mv29"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87e53a22ef6151b8.jpg2d949230-71d9-42fc-baaa-347d08ce2d97?alt=media&token=deaeebe8-e9e3-498c-a1cd-dd1c11f3e6ac",
            "status": "complex",
            "id": "9BNlUAgASiusfGhd1YQN"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c79758f3cd43105.jpg3741e0f1-e4aa-4838-88bc-ca0fccc1d095?alt=media&token=ff038378-292e-42f9-a999-c32e1215a71a",
            "date": "2023-05-05",
            "status": "scab",
            "id": "9CbOC4iJtTWWW34vU2Rk"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c333e3700fe02eb.jpgaab34ee3-f26c-463b-86b9-0baa7fb8fa65?alt=media&token=85efb783-4c32-40dd-86f9-2b31adc5ac75",
            "date": "2023-05-05",
            "id": "9I04bsTTwMkxirMlAlqX"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ce495f171683c8e.jpge228e41e-3507-47c9-b08f-8e51a8eb3db1?alt=media&token=390113f1-e96c-4d18-b1fe-de4bb4c66cdf",
            "status": "scab",
            "date": "2023-05-05",
            "id": "9hmm8NIeolNCUg4XGdBy"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a7526cbd23ce1e2.jpg9e568c70-d8ac-4cf7-bc3e-fef89a8ebefc?alt=media&token=7a9f92be-e788-44b1-b6b6-a873558fd5c7",
            "status": "healthy",
            "date": "2023-05-01",
            "id": "9nhVU9h7R2LMH3G5mHs8"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff22c28d99f0d312.jpg71cda336-e200-4465-9ae2-f61c65e174db?alt=media&token=a954e400-b4a0-47b7-b603-e674a83cf9ce",
            "status": "complex",
            "id": "A3degoBzGTwfW2jTlcc7"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faedab4bf46b60032.jpg7a0cf854-8af0-4345-90df-c8d2fa2531eb?alt=media&token=2066721e-598e-48e9-a907-14e61b16419b",
            "date": "2023-05-10",
            "id": "AHdCwCHynpaxtr5MkviY"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faeac803cddc22a9f.jpgf5c9770e-12cf-4297-a2fc-039b3ed0a7b5?alt=media&token=ddd512a5-2605-4c25-a40d-78ba88745d8d",
            "status": "scab",
            "date": "2023-05-10",
            "id": "Ae4JcPGV7jRiTgewIbwb"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8adcbb410ba99d5c.jpg9ccaa9e1-6b6f-45b6-9c76-4d175d6cc34e?alt=media&token=0d47d1c1-3f7d-4846-bff0-a72a4b9b2c36",
            "date": "2023-05-02",
            "status": "healthy",
            "id": "AgcLy2vvTZrVJQqRdYRX"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a791370f72487ae.jpg528e982a-0b07-44fa-b608-4cc4c83e15e3?alt=media&token=986b81d4-1ae6-4194-b4b5-f9277bed1fb6",
            "date": "2023-05-02",
            "id": "BJLxyuXjadxPid97sCqo"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0bf78e00f878728.jpg11a70cbc-e858-4f48-a32e-fd4662ad95c1?alt=media&token=d5a66be3-0649-4cfd-9475-dc19f1e7aaba",
            "status": "healthy",
            "date": "2023-05-08",
            "id": "BMOLU5xp9HrjezjDACoN"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d9d4a4b97168e8a.jpge1ec317b-35ec-482b-8000-4f2c5fab1429?alt=media&token=6473bc48-4b55-4480-b42a-8c7e7fe1e5cf",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "Bxu1u2dTSOxzbiOVdqIP"
        },
        {
            "date": "2023-05-10",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdea1a45cb1277266.jpg7c134099-7bd5-4e70-9acc-c92c6733aafe?alt=media&token=8294315a-4674-418a-9740-5b2f29b42399",
            "id": "ByM3i7o01aY3j9abYS9l"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b7b961c72428db3.jpg031ce15b-7864-4cc4-8eb7-bc6415ec8584?alt=media&token=6a6c0cb3-0841-42b4-8fbe-46597e8ce510",
            "status": "healthy",
            "date": "2023-05-03",
            "id": "CESW7XJ3wVp87eMcqdRn"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc4b685c56c79d235.jpg5697c662-2e95-4c12-b4cb-dbb153da0cff?alt=media&token=c74ce03f-22e6-46f8-a681-fd6c29e4f588",
            "date": "2023-05-05",
            "status": "complex",
            "id": "CTAwr4jOMbgViRgKfaGk"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d9bb09c8b40db5a.jpg485ef4c0-368f-4c22-9d91-cc497413e4b6?alt=media&token=e0260994-ef61-48b4-ade8-306c1edcb64c",
            "status": "healthy",
            "id": "CfRlaHbRwVbdxANQwZHL"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff7ed080834b40db.jpg27a3ab2f-cba9-429b-ae90-6dcb318b8d78?alt=media&token=47ee90af-e0e2-4ee9-af5f-ca3be7ce79af",
            "status": "complex",
            "id": "CnMcF7T7ajTgyNsRuikl"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe030c2564a5557.jpgae9441e5-33e6-4feb-a1a4-86474673e796?alt=media&token=a08474a3-eca5-40ef-a5a0-10e4f4159b76",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "CwIJFQWKdEnFZXFWkolF"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa63bb587c9394a49.jpgb4be5caf-9360-4cc4-9072-3d7256ea3a61?alt=media&token=6e05d415-f52b-4dde-a7ff-bbf715142455",
            "status": "rust",
            "date": "2023-05-10",
            "id": "DD0uGnof8kCrgi1QtOEZ"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a1f1cdc4f283d33.jpgff9cdfd3-d988-4260-9104-0350c271234c?alt=media&token=db4ee71d-d881-4dca-82a1-f605c7bec731",
            "status": "scab",
            "date": "2023-05-02",
            "id": "DRg2TP75UiDKvEv0ltJt"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0c4c91ec5a4b43f.jpg32198a70-9344-46d7-a9d8-caf353e5f873?alt=media&token=1006d6af-93c4-4fb7-aa34-7e23cb83cd68",
            "date": "2023-05-08",
            "status": "healthy",
            "id": "Dnu8mZTCn1UESqk42wiq"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe4c0e905dd088e.jpgcc4f70d4-db0f-4515-910f-a6caf01fa457?alt=media&token=7f101ee5-5190-4b1a-bc2e-4f72c99ec475",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "DpJ3uLdeIvrfLbnyTBtP"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd7707b87601e9721.jpg76c1fbf2-b00e-4295-bb92-4fcfa93797ac?alt=media&token=dbcb5546-80c2-4456-a995-f90e1e82868a",
            "date": "2023-05-10",
            "id": "E8wH8ui0KS6N6uGr2yAJ"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa50fd73100b37a7c.jpg490aafd1-f43d-45f3-9b4d-02eb364fc315?alt=media&token=477ab5fc-425a-42c8-ba5f-b73781d3d502",
            "id": "ECN73ODZ4z2BUKaJLjvK"
        },
        {
            "date": "2023-05-02",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae266ce964689bb.jpgaed5c907-5d40-4499-91e3-3c4b81045988?alt=media&token=2fd3db98-8db8-4ac6-867e-740c81590189",
            "id": "EHLfRSlvC3lcn5Gf8xkC"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9bd0e6edc42694e4.jpg81d5f109-1566-420f-97f2-0e5e54e982ec?alt=media&token=71638483-9111-40b5-8bf2-0be1eabde343",
            "date": "2023-05-05",
            "id": "EPJtXzPap787p5qQ9qnL"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d3824db1a71c5ec.jpg22b526ae-005f-4aeb-bbe7-485b29ff9418?alt=media&token=e68236e4-d919-41a7-af07-882f595240a8",
            "id": "EUuWCClSQrwv2q7Nwvz9"
        },
        {
            "status": "rust",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aca92c9b1c9759d.jpg914b67ce-a686-454a-acda-8b799e7250a4?alt=media&token=82fd8689-a3bd-4b3b-a964-eaa5b321fa74",
            "id": "EoUd8XGM6xYPa2jELyru"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd6427a97631b27a8.jpge0e33c15-4378-45ab-b81b-8d91592cef35?alt=media&token=4d1709c7-d0e5-440e-bd29-2e9985017b5e",
            "date": "2023-05-10",
            "status": "complex",
            "id": "EwCcVCvxkjaTR5adYtfw"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd8242ec36f9678ac.jpg26c5bfaa-7ba6-4085-bd93-085a580ebec1?alt=media&token=6d009e54-6578-47d8-8d41-58d5efb56820",
            "status": "healthy",
            "id": "F9tSspnyahk1sqarhiRn"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F86b93283f8e4a7f0.jpga78cde41-3b7b-43dc-91af-af8c334d3fb5?alt=media&token=1e47e076-3c04-45da-a253-dc73bfd0361d",
            "status": "complex",
            "date": "2023-05-04",
            "id": "FIhPa9m3foZO8lYGYwGM"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd2427dac331d695c.jpg79c5e152-a1a7-46fb-8907-215e8a410245?alt=media&token=189c8633-7bef-44d1-9910-49fc8d1bca3c",
            "date": "2023-05-10",
            "status": "healthy",
            "id": "FOYh2J4BlpYmDhvMiVSg"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9aa70dba24b96369.jpg7ef929ab-6966-47a1-9e3f-0634912cbb38?alt=media&token=a501fff5-98fd-4a4f-84f9-0b7a8417a41a",
            "status": "complex",
            "id": "FknL4x8tlSLbqfzGRfaD"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc1e7dc1f60893f81.jpg24f23b63-722c-42f7-9f00-90d094aad09d?alt=media&token=79790cb2-3978-4bbd-9c2b-01838f5f0ba3",
            "status": "complex",
            "date": "2023-05-05",
            "id": "FrxNQcvJYxUbCp3uJ8Qf"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffee4c2e29b0f121a.jpg645aaf36-ca91-4fb3-8886-7de3d13caf0d?alt=media&token=e83f4cec-55c8-4193-a884-a81e8cbab28e",
            "date": "2023-05-06",
            "id": "FtR2HEpC0bjJz5mGtYwl"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd49692d6cba56661.jpg164e08a8-e967-404a-923e-61b7e76d1a3a?alt=media&token=71401cf2-50dc-431f-b7fd-3affe9b93cfb",
            "status": "healthy",
            "date": "2023-05-10",
            "id": "GWk7Zhr0Xn44NUAfcJ7X"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffb7de908858884a.jpgb23bde31-132d-4b72-a915-3abb7a2df11c?alt=media&token=20124539-853a-4389-9535-718551fbaf8d",
            "status": "rust",
            "id": "GX9fYCiVmXMrnamj6rlf"
        },
        {
            "status": "healthy",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd16283e7e443a675.jpg75a39900-10dc-4da3-8717-e197414d29bf?alt=media&token=6fd08e51-6f95-4044-a816-1b44c681101f",
            "id": "GXELRJe9dW5pneCIu9uq"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9f9fc8097da181d2.jpg6cad7c44-20bb-4146-ab0a-814dbcef83a3?alt=media&token=4dba3d8f-6d3f-4350-9a35-da7613a929d7",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "GYHqgUAYwo3t51pKQohY"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9e4a89cf5a4945b3.jpg74630d49-1a98-4d17-8443-e12b106ca0de?alt=media&token=0de0533b-7d8f-41ac-b02d-04ff007b0774",
            "id": "GuuDhBUFtMNxLD419gx2"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9e004fca3675d63c.jpgc2a5317e-fcdb-4fbd-be48-8f5e48d98b15?alt=media&token=2fe3cfd6-298e-40b3-aae6-e6ca1abe30dc",
            "id": "H0xK90s49SVAU5bJVj5k"
        },
        {
            "status": "healthy",
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0bde11c077e18a3.jpg9fe7e7a2-6d4c-4a4b-9ede-8f8c5becf78b?alt=media&token=f6155f20-78a8-4c27-9a36-0c4e6e655c6f",
            "id": "HQpbI6m14O3tXmuDHCsE"
        },
        {
            "date": "2023-05-08",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea2a2c4cd82c6fd5.jpg445a678e-bb5a-4c29-a6bb-28652a2402fd?alt=media&token=c3df06e7-afe9-49b3-8c10-62bf5fb5b0ed",
            "id": "HVafaDUhnxgeIMNzSQ71"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faebad4c34a48cb4e.jpgda2b142a-e476-4a3e-99d7-a76506240678?alt=media&token=7a9d939f-509f-4fed-9bd2-08a177b444c0",
            "date": "2023-05-10",
            "status": "scab",
            "id": "HbT2UzvLyCQRDHNeO3GP"
        },
        {
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a5a47354d3d5517.jpg58c97470-0eb0-478d-b3e1-bea04a8335b4?alt=media&token=1ec112d1-d20f-4e00-986c-5a2ed6f91c8e",
            "status": "scab",
            "id": "HnXQCxNSuxU5dvklyYxG"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea15ea31b178648f.jpga819ba48-24de-4464-b875-f3487db17da4?alt=media&token=12521882-354b-495e-8575-1756e51d7b1d",
            "status": "rust",
            "id": "HuzoE6L7jEsdkzRhotEI"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d96dc7a5de5e000.jpgaad8fc54-d551-4e98-a795-7bd80a5ba4b9?alt=media&token=49efb887-d03d-4ae0-94ec-77b3ffa8bc31",
            "status": "scab",
            "id": "I4psPJx6KUY64otet3EU"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a9e59da6b61608f.jpg3c719a80-e80b-4288-af3c-81759b07cc51?alt=media&token=ed15e117-b31d-4856-a031-7200367e8466",
            "status": "healthy",
            "date": "2023-05-01",
            "id": "I55nW6x3kPtn2DWS8eZi"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c286e3f35303573.jpg5b55fe98-1943-495b-8b15-70d299b55560?alt=media&token=47e852bb-1bd1-4cdd-be49-84aabb627a14",
            "id": "I6xvoyRxF1844rYxyjmR"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa17fc596588672cc.jpge2efde14-b432-4982-93dd-a8369368b142?alt=media&token=99645c6b-26e8-4704-8db6-31ffcb463c68",
            "status": "rust",
            "id": "IHisCsxOHdvB9gxRITyY"
        },
        {
            "status": "healthy",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b89d296d42cdde1.jpgddede608-31f3-40f6-a7c3-68874c4dc23b?alt=media&token=c3667315-47b6-4652-9560-a0749dda91e8",
            "id": "IHkLc3rdeLFpwELFxXh9"
        },
        {
            "date": "2023-05-03",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8e8364d9964b6af4.jpgb1f66374-da5d-4712-9f34-889686fa801d?alt=media&token=722fd49e-325b-4e32-ab70-fc102927e3fa",
            "id": "IjYCJpnllpM9VuiOt1CO"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d7738de63c21638.jpg8be56269-26b2-4c49-a263-1369968ec50c?alt=media&token=b2c7be67-8358-48f4-8e36-e7a3cba83ee2",
            "status": "complex",
            "date": "2023-05-03",
            "id": "Imw2yKUPUwJJrrPw5N2q"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5c1d6b74a9049ca.jpga576f1f5-020b-415a-92d9-21efe2e57606?alt=media&token=910d6ff4-bc7e-4193-8d41-ba4ca94ce747",
            "status": "scab",
            "id": "IyPfocNSjTCEdlFZMdsc"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8baada949b911177.jpgb895fec5-f178-4ab0-83a0-5a86c490a919?alt=media&token=94a42c5f-aa7b-4dd3-bb5a-ca0c6f2a0179",
            "status": "healthy",
            "id": "J0na4yJYO7W5P4ibJcHD"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff3484301e47ddc4.jpg41fe1d76-e1f2-434f-b578-d717e5ea4faa?alt=media&token=2c38e2a8-5dd6-473c-98c9-4093956a956e",
            "date": "2023-05-06",
            "id": "J0zZ6sJibV0lTpm6gKy0"
        },
        {
            "status": "healthy",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae594d3d96f4548.jpg4a8328d4-cf6c-42a2-94c4-c6aeed96f6a4?alt=media&token=8224919f-35fe-4154-b304-df9e15d3efb4",
            "id": "JQHLwlIWRuRDjCzlmbbr"
        },
        {
            "status": "healthy",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd7083e6d343dd0e2.jpga27c2e09-8202-4f4d-8030-80d210bececf?alt=media&token=8ef0cc04-b628-4d5f-b48c-47a829552fdd",
            "id": "JSJ1hEBLolwdLLkG1D5t"
        },
        {
            "status": "healthy",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd7206fc730bf82c8.jpg983b0b9f-5b93-40bb-8a96-9c22eca731c7?alt=media&token=13cb0df9-3922-4e54-bc42-49dd70a622b3",
            "id": "JWtoThGcDAxbf7TO6gkp"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F86dc97b0c163e2d3.jpgfa54a8e1-ecb8-4185-8cee-f5d6260343a3?alt=media&token=258c2857-5a95-41ee-a6d7-570bd35a502a",
            "date": "2023-05-04",
            "id": "JXHGhFYle1aHdnNaWTSj"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dcc4a82dea0576b.jpg15e54ab2-bb8e-4622-ba6e-a2e490f9e9eb?alt=media&token=c597cd14-90a3-4844-bf4e-18e3d2c4b0e8",
            "status": "scab",
            "id": "JaX6sETRI3jqSuHGiWX3"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af6259582af8aab.jpga4483ef4-d8b8-4260-8531-c0c6ef7af225?alt=media&token=38aace2b-8c0f-4a09-9d8b-26dfc6309de0",
            "status": "scab",
            "id": "Je0ydWfeRjfdplQtaGWd"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af476a0d552daa3.jpg99979fe6-d914-49f6-a4bf-50de4e719b80?alt=media&token=b34a2ad7-64dd-4de3-be48-472d5003ea70",
            "date": "2023-05-03",
            "status": "scab",
            "id": "Jfm8MGmYt1JIl2W75iBc"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a993a71634e7327.jpg5c90f0a3-dd12-439e-92ba-6cccb3a03f7e?alt=media&token=321321a5-8887-47b5-bca4-63ac22e3a92a",
            "status": "scab",
            "date": "2023-05-02",
            "id": "Jp3Rwu1CE30lAL6HIhW3"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b0c607c9322dbfb.jpg3f48c767-25bb-4261-b58e-6c7cc5a6a57f?alt=media&token=43b2539d-72d1-4a8f-9fbe-375ece7287a9",
            "date": "2023-05-02",
            "id": "JrYTkNwaIGJm89s3fIGQ"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d98efc88aa54567.jpg3e60e973-61d8-4629-a1d9-30b7ef009978?alt=media&token=cba69e52-8bec-4d22-ab19-111d20e9f08b",
            "status": "complex",
            "id": "JsP13HXls6Akj2l6P9mJ"
        },
        {
            "date": "2023-05-05",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cc5b04a036b0f7f.jpg9d2cde82-b17a-4db3-8afe-030f92f72d5e?alt=media&token=648524f3-5acb-4c9d-beae-494dc0b80cfd",
            "id": "JszKi9jYRAHYSeOBdyyY"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fded0a0c1e3b2fd03.jpgc547596b-d193-4c50-8be2-ee013d759cf8?alt=media&token=01575446-0969-43fb-bb10-214c1ef41ad8",
            "date": "2023-05-10",
            "id": "K0B57R0vrjkYuIVdml2E"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ef144c9da1a616d.jpg1ec486de-3fce-4066-8ae5-60b23410c38f?alt=media&token=5f591167-792e-43a3-9477-7a9b33c63ab2",
            "status": "healthy",
            "id": "K1B29jOTtc4qSSpvgYVu"
        },
        {
            "status": "complex",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdfc73884e0e0bc17.jpg6638d52c-46a4-4d32-b8b7-038f0c8e829a?alt=media&token=8c1e1549-df7e-4f8e-88ff-fa3066c6003c",
            "id": "KHklgjtFPebr78VhrE1y"
        },
        {
            "date": "2023-05-03",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8f42b47a59c4e9cc.jpg8ee78efa-0904-4ba1-ac5b-285355a44826?alt=media&token=ccc98a2a-422e-4fc2-b398-b70730a6d4f2",
            "id": "KMQ5Xzhg65Y9shptk279"
        },
        {
            "status": "complex",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd7444c3a33ec1c9b.jpga01c190b-279a-4b5c-ad42-5e962959b0f9?alt=media&token=acbb090c-6bd2-4d79-b542-2c2f705a60e6",
            "id": "KR43QimDBfxh17U4se7g"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a39f159f554aac8.jpg70113e8f-ac85-444f-a9b3-dc0618236587?alt=media&token=4eb80bb9-f5f5-4976-9102-71c3b86d39ec",
            "date": "2023-05-02",
            "id": "KT2LtIUmmIyYY0uaogxN"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9bfac2d0c2ab40be.jpgeaa142f3-3f5b-42da-a154-07d1f376ffbb?alt=media&token=c15ccd61-7eab-48d5-982c-525ee56eff3d",
            "id": "KdDcjnabry6z0p05eofs"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a27d495855e55da.jpg35ad13bb-3f67-4004-bb24-32387facf0b8?alt=media&token=37f114cb-5c22-487f-8383-9c6a29a51848",
            "status": "scab",
            "date": "2023-05-02",
            "id": "Kh7uc9UuY4I3PlpXY6Qj"
        },
        {
            "status": "healthy",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a9138ebc3a68f8d.jpged173a22-fa6b-4477-9838-0168c68b5aec?alt=media&token=ad2c3e14-3ed7-40ad-85ec-390c25f2ff2a",
            "id": "L7jEpMtiVO0Dt8b7C31V"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aa1674fda23c14f.jpg1183c3c0-1b25-4553-b480-d4a10a0ad9cd?alt=media&token=d2386079-2164-4496-9588-effc7fb5a3bf",
            "date": "2023-05-02",
            "status": "healthy",
            "id": "LJAd8PmtM0BA4FCzd3va"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af578ce650e91b1.jpg73c9008b-7a29-42e0-b24f-f0c87f510d7c?alt=media&token=0a2f1a54-4a43-4fd2-b922-0b16fb0363fa",
            "date": "2023-05-03",
            "status": "healthy",
            "id": "LNfUCLZMiesKnThxRhTY"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa21b6906be2be3c5.jpg07786205-b6ec-4e63-a73b-5b5e0e14d077?alt=media&token=c3b5ab6d-ecfd-4a76-a925-5a22bbd6261d",
            "id": "LSKJM72ekF4O9l7A5Mmf"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ab3ca425a7ca5ad.jpgc0df79b6-ec8e-40cf-a96d-db5d94d49088?alt=media&token=f4294f8d-e4c6-4b66-9bed-6b1954c0f1c1",
            "date": "2023-05-01",
            "status": "rust",
            "id": "Lma0d5pSkHLggUD4fWC0"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa17acb4d4e962974.jpgd0e4dcf0-bac5-4360-8094-6bcf92e42fb3?alt=media&token=a492bd91-522f-4939-bdb4-455625a47a80",
            "id": "LmgryImv0NoZ4AU1Shnx"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5183f837846ef60.jpg86955ab6-862e-4470-9242-dd19efc9aaa2?alt=media&token=0c7c5763-6617-4526-b281-28d4b56b15d8",
            "status": "healthy",
            "date": "2023-05-10",
            "id": "M8E672EhrDNkJcekN3RM"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feb57e03f903587a0.jpgf5cc278f-f5a4-4c64-9d83-49e346b2fc0d?alt=media&token=67b012fd-5917-4445-8021-e7897b1b4a05",
            "status": "rust",
            "date": "2023-05-08",
            "id": "MOPHlzONhsIdvewERSae"
        },
        {
            "date": "2023-05-10",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa29bb2398fed840e.jpg63b0ca48-2748-47e8-b2eb-acd993f97e96?alt=media&token=bb869315-912f-4087-9733-2a7b55f50896",
            "id": "MlEOiokNociLklguVmwn"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae5c88ec78eef80.jpgf64a72de-d9cf-4f35-a648-a2790cbd7f99?alt=media&token=b7f2d19b-c94c-4184-be17-e03912aadfa2",
            "date": "2023-05-02",
            "status": "healthy",
            "id": "MlpLrtzucuhTaeaqiNBY"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ad1dad5e545602b.jpg394d5121-4591-4287-8dcf-84aab32f615b?alt=media&token=8e81222e-682e-4797-88fc-7d940e6cac2d",
            "status": "scab",
            "date": "2023-05-04",
            "id": "MmYy22uCzP77vCZe8cHj"
        },
        {
            "status": "scab",
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5b6c0a0b2ecbaa8.jpgd505a15e-2707-4035-8c6d-2032adf9de42?alt=media&token=41e97cfe-f342-43e9-8620-d7e8d342367c",
            "id": "MpS8s47zgVNgWMTXiTs4"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc4a29529587637b7.jpgcdfbf680-3697-416f-8241-f00f87c8a7fc?alt=media&token=cb12f740-b6eb-4bb9-a0f1-0f7609c4fa67",
            "status": "complex",
            "date": "2023-05-05",
            "id": "MrnGyOc8ug3OZm98DajD"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cf6d017d7d80079.jpge98500d3-c119-4eb2-a38e-d019ff97cd93?alt=media&token=e68d6175-276a-4a29-bb2f-d4e9fb9fd10e",
            "date": "2023-05-05",
            "id": "MuCnb9Ej5hTr5jKbMRxt"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9db34d659c134867.jpg4a0354f4-7cac-4a9a-85d0-80166b81da5f?alt=media&token=eee8f57f-097b-421c-aa59-d31ca198fb86",
            "status": "healthy",
            "id": "N09sxrYJW8gnKsSRyVVC"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd09555dbb4a71543.jpg9330b6f6-212c-42ee-ab1f-c16a13d77a7b?alt=media&token=6d4f0fb4-e5ab-42eb-8973-21fe911fa89e",
            "status": "complex",
            "date": "2023-05-10",
            "id": "N0iQXATT4Dta8pgzlMFf"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5bb9c11caca096a.jpg91a79bd1-2377-4410-b888-fc21c0f17638?alt=media&token=ab144419-18e1-4ca3-9682-bd9ff4f0e846",
            "date": "2023-05-08",
            "status": "scab",
            "id": "N7uCKL7fQxFaHCe4mysj"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a34b9fccba0fa88.jpgb9abba97-18c3-4512-b651-96305fe7b4af?alt=media&token=da1ab6a6-b57d-497b-8fcc-c6c91b0551dc",
            "date": "2023-05-02",
            "id": "NJf0Tb3rG7CWfR4ow3eU"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa50fc3ce67617a30.jpge83f4c11-30a9-475f-a0d9-87d50fd87500?alt=media&token=78ce6e3a-eb74-4987-a294-28fa22b324b3",
            "status": "rust",
            "date": "2023-05-10",
            "id": "NPBt3sn4geV8WsOFcPLe"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b33867edd60b0a2.jpg509a99fa-0675-4453-b2f7-84c1472251b1?alt=media&token=6cb1223e-c984-48f0-815c-867bec99e62d",
            "date": "2023-05-05",
            "status": "scab",
            "id": "NWqdugLeaLRJEObmnmcm"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdfe03bbf63030702.jpg8eb78eb3-36b4-45bf-928b-cad1725822a2?alt=media&token=af4c5eb4-65ff-49eb-8d06-54022fbc0c09",
            "date": "2023-05-10",
            "id": "Nue4Cfk6pNrFb5pT95lc"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0bd9f01383ee348.jpg9de1118f-ab6f-466a-b4e2-a3c952b97a4e?alt=media&token=f14d6eed-f983-4575-83be-7eb499e00991",
            "status": "healthy",
            "id": "Nvwxe0xje2jQQzhJrcWl"
        },
        {
            "status": "rust",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae29f9e6c218739.jpg2c31e9b1-c3f7-40f7-8387-45f07377ea7b?alt=media&token=68744c4f-3a51-4844-a297-e7920973fd45",
            "id": "NySOC9vAgOXGX52en3lB"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea70e75d93a89245.jpg1a732a4a-8d2d-4297-8649-878aa280dcbf?alt=media&token=5d456213-8420-44eb-bfe5-767d9e3b6d1d",
            "date": "2023-05-08",
            "id": "O2oZNnLE6wyiWE403JkU"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa23b8f1e6ea19545.jpge8e1ac99-da5b-4111-8d44-644f039aa4a7?alt=media&token=c615dbb0-974b-4ca9-b030-f671de8a5006",
            "date": "2023-05-10",
            "status": "rust",
            "id": "OBxpMTMrun9HZi4PKKpk"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87d48901edcfc3c3.jpg5058e8c4-0624-451e-ac2f-abd90b4f0e45?alt=media&token=bc5aa335-9074-4349-9886-464c6dba02b6",
            "date": "2023-05-04",
            "id": "OKFUKabk9lIe7LK8oCzq"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dce486d6e743232.jpge824c1bc-65c8-47c6-a4e4-d4740e526c34?alt=media&token=5b73c988-c965-4967-aadc-5f877c46df57",
            "date": "2023-05-05",
            "status": "scab",
            "id": "OKqu4hQlwJ7agYPQacuh"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b94cbb0cd7cc570.jpgbfd198ff-68f6-4675-a43a-55565f2e2296?alt=media&token=f2b4e82c-0daf-49dd-96ed-d64fecd0dc5e",
            "status": "healthy",
            "date": "2023-05-03",
            "id": "OQFjV9chdknOR0pc455W"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F85eaeb15a8a55257.jpgbd763e27-1b19-481c-a144-95381a87476d?alt=media&token=d84e8ec5-d740-468d-b852-3ea81bc8a0d5",
            "status": "complex",
            "date": "2023-05-04",
            "id": "OXlnXpbO0aboIyTpOOjf"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe1e03542661f22.jpg5bb62980-d2d5-4a0c-9c8f-0129433dc3e4?alt=media&token=8d696fc4-f41f-4b84-affd-5fed01541980",
            "status": "complex",
            "id": "OZDXGUPzAKWPG4V99xCg"
        },
        {
            "date": "2023-05-03",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae23fc2603eb569.jpgd2a29f72-2746-4418-a974-82fc6b19bdc4?alt=media&token=a752dd70-5a11-4321-ab51-494eb697470e",
            "id": "Obrno0ADd0UuMjj6ENkT"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5614ade2f30c947.jpg91cbeef4-2d46-4d81-ab25-c71e527686d1?alt=media&token=552f944c-e5db-46a2-b660-c3576e0d12a3",
            "status": "healthy",
            "id": "OgaXudvqWjEXIK3eg9tt"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a783d2e364a9ccd.jpgaf07aa03-b0ea-4c50-826a-c628d5b19976?alt=media&token=9452aebb-c46c-4918-8611-a9aa443539e3",
            "date": "2023-05-02",
            "status": "complex",
            "id": "OiUr7wc5SkGmZ2VGQW2H"
        },
        {
            "date": "2023-05-02",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a7513a0bbe451f5.jpg7ba09338-8829-47be-ad80-c8b812a5e94d?alt=media&token=76b22118-7927-426a-a953-a689d8a082b7",
            "id": "Oqw8bVUpAnUtkvaU0354"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa56d9ea69121d1d5.jpgdbd86af0-be90-4ffe-9703-7acbfc0160fb?alt=media&token=24601bfc-d857-46a5-8400-551397c84111",
            "status": "rust",
            "id": "PEjV9eBC6q5q24xr5u6l"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc5ce0dc3f197321a.jpg144565f0-1017-47ae-a5b6-de7f6b3651da?alt=media&token=f78594a2-a294-4839-a067-6f97e4254802",
            "status": "complex",
            "id": "PMn7qWFMTNgUbRgfLUSJ"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae14262be8af95b4.jpg53b2d9cb-1fd1-4506-a79a-a0a5794e3cef?alt=media&token=370fb09b-6311-47f9-849e-5fa158ef2acd",
            "date": "2023-05-10",
            "id": "PWYy1VsBeHMIgtoloJTt"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdeece3b039686245.jpg3c905c7c-d929-4d8a-a7b7-d9e2c7d4a03c?alt=media&token=c434d387-f92d-49a5-b019-c3ccdd02fb06",
            "status": "complex",
            "id": "PgL6Db93tAQ3dyaQsdLT"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff8e3b8c1d88300.jpg019e0e83-c9ba-48a4-b95a-dcfe9bb0b6aa?alt=media&token=cf05a911-7864-466e-944d-072a56abf6a9",
            "status": "healthy",
            "date": "2023-05-06",
            "id": "PhUxNHg1EEwXOK4tB8WV"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87a46fcc18ed4d49.jpg411bbde2-f1b3-4cf5-8a4e-3dbb3213d9ac?alt=media&token=a5c725f2-72f5-433b-bfad-fb5edd39d769",
            "date": "2023-05-04",
            "status": "complex",
            "id": "PmJnjJD3dIkOGywfOS4P"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0c6ba54e95d511c.jpg45787d1f-0d84-4fa6-aad5-a85631c8abb5?alt=media&token=dee0d35c-4db5-4e68-a8bb-efe58bd66076",
            "status": "healthy",
            "id": "Pufuoci3tXLOrF2dNJU4"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b6cd59f0edb9021.jpg26d15dc1-696f-475d-ac34-478f5c1c8740?alt=media&token=693d76ce-b291-4ecc-a172-d88920713490",
            "status": "healthy",
            "date": "2023-05-03",
            "id": "Q3OaE45oQEF1nsVaJu3U"
        },
        {
            "date": "2023-05-08",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feb5c051fcec46c2c.jpg3ba56c90-e2b5-4244-b6a6-a468e85ef4b2?alt=media&token=72239861-74b1-40f4-ab65-42b2f574032b",
            "id": "Q6ldnaAjz5gXTYn7whb0"
        },
        {
            "date": "2023-05-05",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cffe38a92589219.jpg234ed159-4d8a-4067-b754-b49f0e0ef46f?alt=media&token=29df5348-0579-47c4-b66d-bab80e15112f",
            "id": "QGpsvvsFmQUkC2Q7JPdT"
        },
        {
            "status": "healthy",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aa5ce176c934de1.jpgd026c652-3e77-4914-a5fe-3f1e217b6548?alt=media&token=6d3896de-b645-4ca0-a787-3372b3c7d1c4",
            "id": "QHmCHLAIrTK67b99kMWY"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a0be55d81f4bf0c.jpg3bc37eac-38d0-4bc1-9edc-f1faf0ac4045?alt=media&token=545cccf7-7ccb-4114-9f2e-eb9df2c8e4ce",
            "date": "2023-05-01",
            "id": "QXyqUAOzHDANO7C4Bfxj"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ab7cafa03db6105.jpgd4666fd6-9e34-4a81-8d2f-83ec2eb00fb1?alt=media&token=e4934712-7420-4c5a-ae49-78f29b7a7cfe",
            "date": "2023-05-02",
            "id": "QoULtTchwSyJ1o80QuZG"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd3589b48c84dec67.jpg841637b6-23a2-4ddc-bd38-dabd98c7f870?alt=media&token=544a6782-aa9b-4080-bb13-a0e5e5cf0135",
            "date": "2023-05-10",
            "id": "QuPrSYxw3kzkJNuMCUXr"
        },
        {
            "status": "complex",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd03240df8f19fa5a.jpg8d054057-3345-4ca1-abad-518cc846fea9?alt=media&token=2c04bf73-5f26-43a1-974f-5b2a43462357",
            "id": "R0TuNd8ldXJ2CU2GSNzY"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc5b836e660fa30bc.jpg2b96ab1c-eb3a-4202-a555-21112597ddb3?alt=media&token=4d2f7f53-4884-41e3-a82a-bc002ca4f9d2",
            "date": "2023-05-05",
            "id": "R8GStHseiASBDGTB10UW"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd48785c6958e26ed.jpg9c61ed4d-9f1b-4073-b263-f76c9e9da67a?alt=media&token=23fc8015-d9a6-42fb-9903-1c6867de8d89",
            "status": "healthy",
            "id": "RGkDCBJDw6ML8hDXzGau"
        },
        {
            "date": "2023-05-02",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a16276936ea7aca.jpg9cc41546-2b06-47b1-9048-48b2ed30be6d?alt=media&token=e5d3a00a-323f-4e6f-96eb-d27d4cf06eac",
            "id": "RIZoQbB24EzGkKcFd5A7"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b9273aac0ed0ea5.jpgadd7e794-ebd6-4011-b714-ee95a4f841cb?alt=media&token=b4bc62fe-b4a9-4020-be00-8511e59c38ec",
            "status": "scab",
            "id": "ROF1fYwMM4XLEAwSYzFd"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cc70090e66ada7f.jpgc4b51e86-f496-449c-9175-b4603ed6ecdf?alt=media&token=11be35f4-b307-4b0c-af03-c1e630ce493d",
            "id": "RUJb1bOpXlWUbTfEGejQ"
        },
        {
            "status": "complex",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff8ac2d286a6a43c.jpg1f29126b-ebdd-478c-80ac-a7a75b754ae4?alt=media&token=12d4948d-a90b-4fcb-864f-8d1e59796964",
            "id": "RYcChK9D72vVKoT2UoEN"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b4e39ffc0d58510.jpg9a6080c7-8e3c-4129-9620-6ea6be8c3439?alt=media&token=a5144f09-6ab0-41a2-ab34-2b1a5f94a3f7",
            "date": "2023-05-04",
            "id": "S4sky6pRZ09eFuTQ5pG7"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa029a1f8cd99d79a.jpg4531a352-e577-4a89-9430-54ce67243627?alt=media&token=b269ff62-735a-4de5-861c-1d3300034897",
            "date": "2023-05-10",
            "status": "rust",
            "id": "S6UNpzooJEm5qwjvud95"
        },
        {
            "status": "complex",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F88ac6519b6d99e78.jpg3cc9eedf-a980-4828-aeca-13e422fef77a?alt=media&token=6ca6aea2-62e4-49c9-823a-ff29349cd471",
            "id": "S6jhK9fZkbVuqytEgJL0"
        },
        {
            "date": "2023-05-04",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b3d70af19027a8e.jpgcfad8b03-7f81-4f00-9581-5ee3760c89ca?alt=media&token=176c237e-30ec-40d3-bbfe-c1532c08ebea",
            "id": "SDf5tsEcxAXoNzqsYdL9"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ad45081aa9eead7.jpg17e0b210-a326-4816-a7a5-4b237f0b9f02?alt=media&token=eeb34825-b513-4140-8933-0bbab7d399d6",
            "status": "scab",
            "id": "SFPvl042IsRk33A2fHjX"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8adb365ba5ca5485.jpgab4d0c71-966d-474f-93fb-30247acd55c9?alt=media&token=f152c077-67e6-4059-bcea-87af3d6d7e76",
            "status": "scab",
            "date": "2023-05-03",
            "id": "SFRCXbrUDp7hxi3WmlLO"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa24dd6cb0417fb32.jpg2f87c402-2024-4b48-9e90-d108c681792d?alt=media&token=b2ef1da8-0b1d-4682-b83d-d6c0cdcaa771",
            "status": "rust",
            "date": "2023-05-10",
            "id": "SMBne4JVdPT1CHDAfUvn"
        },
        {
            "date": "2023-05-04",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F86f8cc063b3f8e31.jpgb5f337e2-f8df-4ef8-83a3-b6826a9e4739?alt=media&token=e338b0d5-416c-4b82-bef9-41eafd2f7cb5",
            "id": "SXePQYt21QsMBDESt3i9"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a62b42b56976baa.jpg22c72637-75ca-449a-adc7-0864f91bdfb0?alt=media&token=9c22364a-a85d-4402-afe4-46ad29872b4e",
            "status": "healthy",
            "date": "2023-05-01",
            "id": "SZkMjHlC83CwXAvYFPT4"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5becfe15c872080.jpg48d8eda4-c3fc-443c-bc4c-ca95156e74e1?alt=media&token=51d2c987-61f5-48d9-8dde-6bc683d17936",
            "date": "2023-05-08",
            "id": "SdBGjpVlb3M9SmXXyQCw"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fded57ce32063350a.jpga9fce466-634f-41aa-bbb9-895eece50993?alt=media&token=aa84bc0a-5acf-4473-821c-148b2474d346",
            "date": "2023-05-10",
            "status": "complex",
            "id": "SdQ8IPsIZ6r2iqC18fD4"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b2ca5b9639b5899.jpgcc646fea-f6fa-4178-adbc-0a865cca9426?alt=media&token=d72759fa-fa0d-44f2-91a1-4d3e7a306ef7",
            "status": "rust",
            "date": "2023-05-01",
            "id": "SfmFHZ0l8sailKo43P93"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5412ad6ae685b78.jpg089fc7c6-e04d-441f-8591-f75b924878e2?alt=media&token=4e136659-9c57-42e3-a406-71e4a1655ba5",
            "status": "healthy",
            "date": "2023-05-10",
            "id": "ShtWD7FadvVi7Pta8oWQ"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aa2c8cb981bfa3b.jpgdc87e3b5-a134-46dd-9f68-a81ef1680a61?alt=media&token=b3f8fa9a-9004-4c8d-a0a6-31a5de824394",
            "status": "complex",
            "date": "2023-05-02",
            "id": "SkPSB1Vc53ZG1gE4kszY"
        },
        {
            "date": "2023-05-10",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faec646ca52b1387d.jpg12cebd30-f73b-426f-9027-ab9521007ac5?alt=media&token=332286df-6311-40ed-bbe6-c4ce3f727401",
            "id": "Svj977PbMImQEhqygVOS"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0b41a4b0d9cc75b.jpg00272ef5-96df-452a-86dc-211c3ef0d658?alt=media&token=bb499be9-2a0e-4039-a6db-3692471304eb",
            "status": "healthy",
            "date": "2023-05-08",
            "id": "T0l2m6UxXcxCUeSQhLmq"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ba5d79798b86815.jpg05c9c15e-bfe4-4b4f-a799-eb23060869ad?alt=media&token=4037332d-7f47-446e-90f8-03cdcdac500d",
            "status": "healthy",
            "id": "TJl0KTMsLGlxD3vApHO4"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5017e9fc074311f.jpg13b30d47-fe0a-4c14-8699-622c64f0c961?alt=media&token=3a32affb-75df-482f-be64-12d7a7456705",
            "date": "2023-05-10",
            "id": "TXnOIz7gnW82KNpeOprE"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d912819666aec6f.jpgc1cf1330-b265-4209-a669-647537f9e915?alt=media&token=971824b5-e2ec-4560-bcb6-9cd044871b3f",
            "status": "scab",
            "date": "2023-05-05",
            "id": "TgzT6VNsh0v09GHUo5uv"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9a223715553a6eae.jpgf6526370-6d60-4eaf-b58c-e23ef21eb323?alt=media&token=c4f103ed-1422-47e4-9353-9d463d55b406",
            "status": "scab",
            "id": "UB87k1Ic2GcTCyxvQxFU"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faea428914a53efea.jpgb3a52b8e-96fb-411e-9a1f-724337376943?alt=media&token=a899153e-191e-4282-8c9c-ce3dcca802df",
            "date": "2023-05-10",
            "status": "scab",
            "id": "UKWseRrYOa3Wj3S3PCNG"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d0f6e60819f9a5a.jpg6513778a-25a6-48e4-ac00-06b4968cb47b?alt=media&token=d350f18f-e002-407b-9d9c-2700c34fd7af",
            "status": "healthy",
            "date": "2023-05-04",
            "id": "UXP2YPg2L382MLb0bCc0"
        },
        {
            "status": "complex",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffdc70c492370f02.jpg5521be1a-4659-4ac4-85a9-c305ca010341?alt=media&token=b9af7ec0-aa56-4914-9864-1c7968a04724",
            "id": "UXm0EbzeyxJAR7tjYQxq"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ace6ac0f5153527.jpgd75d2de0-d7ee-40b3-b349-249b78d5b8af?alt=media&token=8e68a5cd-d379-4c3f-85f8-1478d4298ded",
            "date": "2023-05-04",
            "id": "UlAll40CQtjk2HLLp5bR"
        },
        {
            "status": "rust",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffa0ad0756929391.jpg7ee92331-6b81-4748-bc4b-eaa12482bcad?alt=media&token=22fbc556-7912-4d80-9431-716396f1dbc8",
            "id": "Umdzpmo9ceUuiD1e9Upq"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa86b3a2ee587a50b.jpge9816c15-25f5-4f3b-a702-fe431beb3eba?alt=media&token=818bb6ba-af6f-4156-9c58-e9a52de79e3a",
            "id": "UqdZNOTaWsCI9fktsm16"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ba8649c9974e99b.jpgb4f285b7-6962-407f-b728-435c2e3cbf1c?alt=media&token=980eae3b-7cf7-49b5-9472-7fe29a536182",
            "status": "rust",
            "date": "2023-05-01",
            "id": "VBJXIFbivTVWgd2xxifS"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd768cb95389825ea.jpgc4d22d4c-d427-4e75-9c6c-fdcefe7e523e?alt=media&token=140dad82-625c-4aa1-9253-df6d1ed3b01a",
            "status": "complex",
            "id": "VF1MByxxA1L4qa9A8WaO"
        },
        {
            "status": "scab",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a97154acbaadd52.jpgcfb6f5e6-ab1a-4545-8cf7-d473c9b98b27?alt=media&token=4ae4bdee-0126-4554-923b-366e8e5c48f6",
            "id": "Vh8vJsN77HcCWD7VDDzG"
        },
        {
            "status": "complex",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8fe8d03c12b76fc0.jpgcc7f1b09-8c65-45c5-97ce-c35150a3a8db?alt=media&token=2a7a0c81-fac9-4cc4-bed9-461c47d2f409",
            "id": "W2wLYVH2iSB9gjB6HJjP"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b8b96c561331fac.jpge287278e-3130-44bc-990d-f90040aa9f46?alt=media&token=866bcc89-5bfa-4872-a05e-a0d29a200e2a",
            "date": "2023-05-03",
            "id": "W3qlkF6uRDz1X0rmhvTf"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8de4948fd9ed3805.jpg5c3f91e0-48da-47bf-b4bd-ed6b9becb19c?alt=media&token=51316553-7f02-4b95-b07f-52c35aa5900a",
            "date": "2023-05-03",
            "status": "complex",
            "id": "WD1oWwPOmN6PAkwKiGIr"
        },
        {
            "status": "scab",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a7ad65bd849d505.jpg4dd8c282-2040-456f-a648-141ceca6cfec?alt=media&token=dceae4f8-19f3-4af6-b5c4-7bdc180a6aa2",
            "id": "WHIDkV5WwzoQx7XJ4bV8"
        },
        {
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F88ddc1bf69786162.jpgc074578c-023a-462e-a046-d3060f88cffc?alt=media&token=2985d980-3bcd-43e1-8bfe-9bbb2470995c",
            "status": "complex",
            "id": "WkPix77u7MNBqXFHOn1z"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9bbc424bb50b3da2.jpg8c71cad5-5af1-414a-9d38-a62c6fe4f606?alt=media&token=f2fc6c59-bb01-486f-9c65-b0bf7c3454d6",
            "status": "scab",
            "id": "X7LIxKvTYt6hK58IzV0d"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0c1d38d0b776f08.jpg00486fd6-4c13-4d21-b5d1-baa82a0e6f3e?alt=media&token=0da371e6-ef90-4212-8df5-f13583c8f2c7",
            "date": "2023-05-08",
            "id": "XPTUN3AdvbkPssx5LjDY"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d873cc2143dfb1c.jpg87dca760-c3e3-48f1-be73-9f84efb8784b?alt=media&token=b9632586-c6a9-490d-b13c-916f4725713d",
            "status": "complex",
            "id": "XZpxUEDZRr4F2yd16zSI"
        },
        {
            "status": "healthy",
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0c5c7ce1386f131.jpgf27e31bb-6dc5-439b-9536-51b74aa891b6?alt=media&token=14afcfb3-cddb-4927-b2a6-41711182df96",
            "id": "XvV3kxHJhwbGYv563RYh"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cd0cc3176c4fad1.jpg5acb8976-1353-4fda-a8a1-dfd49f64531b?alt=media&token=d12c0245-461b-4e1d-a74b-cf0334807904",
            "id": "Y0SMXjPAtq58L4WswuMu"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8f8fe24b80e21cb7.jpgb8c78794-3f52-422c-8b70-cb2c5fc71d6f?alt=media&token=4a376237-5121-4685-a536-5d3fb271709c",
            "date": "2023-05-03",
            "status": "complex",
            "id": "Y3HB0NwvJSsAKu5ve7uo"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5b6c212d12fd80e.jpg47b06790-1653-4bd3-ac00-1471b7237b09?alt=media&token=64b99a02-61e8-44ac-891d-0b4be4e868dc",
            "status": "scab",
            "date": "2023-05-08",
            "id": "YHrEQZpugjQBrfgGjb77"
        },
        {
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a956ab79447896e.jpga19e352d-7080-4d87-a4ce-aff051fa6cc2?alt=media&token=deaf92e8-accc-43f3-87f1-e7954f06a4e9",
            "status": "scab",
            "id": "YQu2kt8Sv1JGgAYsYbde"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a57ba815538fce1.jpge13c13ea-b1ca-466a-83df-0791d4f90f1f?alt=media&token=72bee82f-fbf7-4056-9cef-eafe9c8b627b",
            "status": "healthy",
            "date": "2023-05-01",
            "id": "Ya3TZlOe8LxlPcchoxyJ"
        },
        {
            "date": "2023-05-10",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa26f1e955abe5228.jpg139bf43b-fd6c-4ff7-9b5b-f33523eb0891?alt=media&token=9160336f-bc58-4d48-b042-864c9273611e",
            "id": "Yl9ao9M3MxlucMUjXG8G"
        },
        {
            "date": "2023-05-04",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b993a90b4c46c6f.jpgb31e2cec-ca35-45cc-a6c9-ee3ab11519fe?alt=media&token=69bb9803-bfd2-4e77-8dc5-bf51646c4310",
            "id": "YrAV3iLexN29JUCSRFHW"
        },
        {
            "status": "complex",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffb084c28f4f30cc.jpg66e92398-caa1-4e21-9c43-be87f4a9b22f?alt=media&token=b166300d-5e0b-404b-ab1b-e43662129ab2",
            "id": "YwsBaT9OaeRyXXgR2FlI"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea604dda987238ee.jpgaa1b2007-d9aa-4866-9ebd-c42cfd24d208?alt=media&token=de8bef29-574e-4f95-bd6c-f3fc5781bb98",
            "date": "2023-05-08",
            "id": "Z3fSoj5IIT3UrtaPIBbW"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87c917a54876782f.jpga5e721e6-3653-4edb-bc87-302e598ebda6?alt=media&token=ce404e03-374d-4bc5-9321-7649bec6816d",
            "date": "2023-05-04",
            "status": "complex",
            "id": "Z61X05AYfgtekF64iRur"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0c00bc0afc7a2ef.jpg95bd4a39-0481-4e3f-8a76-81ffd1830f1a?alt=media&token=cda0e5fd-4ca4-4478-9009-22abad623f76",
            "status": "healthy",
            "id": "ZAtMh0n1yvkgiczkJNd4"
        },
        {
            "status": "healthy",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe8da82988311da.jpg8b924d00-d951-4d82-a457-0af25489ea7a?alt=media&token=bd2ae26d-bad0-47e8-bf57-6491892f0e84",
            "id": "ZNZDifsS2vrH98uninLt"
        },
        {
            "status": "healthy",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af8a0c2beca90ef.jpg4369265d-97cb-4ea4-93e6-6a11a9c20b57?alt=media&token=ce13bbe5-69f6-482e-8dd9-47c31dd3c6b0",
            "id": "ZUjv7VDUrBowhcimbZRn"
        },
        {
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8adac3dc9f820d0f.jpg25194123-959d-436f-8bef-90084ed93078?alt=media&token=246eac17-7cde-42d8-8614-43b636d01c93",
            "status": "complex",
            "id": "ZUlaBZFEpaYYE3Noz8OT"
        },
        {
            "status": "complex",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff0cd19c83ac878a.jpgbf134499-fc1e-4194-b442-0a819edf1598?alt=media&token=4bce298e-bcfe-4343-8e7d-5db1f768caaa",
            "id": "ZbZnfEliR6CZaEMgEV78"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cbe21bb0960e3e5.jpgff55dbfb-d843-4065-9b00-0364a6c6cfa5?alt=media&token=5b4c14dd-5d7e-402e-b030-cea78faa62fb",
            "id": "ZtnKR8JYyUDlBf9HbyAD"
        },
        {
            "date": "2023-05-05",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc3b555e0aed194cc.jpg58172d61-057e-4b2b-9dd2-27e458e5f1e6?alt=media&token=9b189ea0-79f3-4ff8-a183-a1d7c87398ba",
            "id": "aKE6A0cNwK6zD3rp9EVZ"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b8c7565dcd0f960.jpg1cd25c92-4423-483c-a055-ada4e5fba56d?alt=media&token=81ff8a8d-dbfc-45ac-bc09-e2d25ca65fdc",
            "date": "2023-05-03",
            "id": "acbCpFm6JOOjprx5x63L"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa049d60f8b88f17f.jpg18f33a95-b770-4a9f-a808-11185539918b?alt=media&token=ccca0815-eeb7-4abc-bdf2-168c1f0f9cf2",
            "id": "anoykWOOT4mWd3evsQc2"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feaabc28781959717.jpgcd493aad-4c7d-4315-8803-e4b42a16fe0c?alt=media&token=f06ea61c-2d5e-4cb7-b72d-3277d7a89510",
            "date": "2023-05-08",
            "status": "rust",
            "id": "ausZaE4d6bejjeWXFfAR"
        },
        {
            "date": "2023-05-10",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa49bb8b160eadba4.jpgf754f62c-baf1-46f2-b712-95f881b30d59?alt=media&token=febc04e7-816e-4b9b-ab9f-d334e46e936b",
            "id": "bASs3dLsmCoiBVFTFN4Z"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffdef27b820081c4.jpg02f6457d-ba2b-4443-a6a0-0c5d7342adea?alt=media&token=93aff11c-0fcb-463d-afa2-ad69036b7087",
            "date": "2023-05-06",
            "status": "complex",
            "id": "bD9T3Ibu4TB2sKmvcnWe"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d0f637846725e0b.jpg51feb5ff-b8f8-4f87-a617-02c734eb9587?alt=media&token=d46fddf5-7e72-4991-8349-730a1de4f76d",
            "date": "2023-05-05",
            "id": "bOR6ISh1BoJfRkdxSMU9"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff7ec1bc1ed08120.jpg50f6bb85-b1bd-4b51-bb4f-56988a157e5f?alt=media&token=a722054c-c725-4b71-9eeb-ef9bdf83e2a8",
            "status": "complex",
            "id": "beoRplBkrvaGQkdVleQM"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F89a1c7961b50ff49.jpgebf99320-97ec-4e8a-a0bd-a3d091a328d1?alt=media&token=bea5ddf2-5cbd-45d0-a887-e663ac60abf3",
            "date": "2023-05-04",
            "id": "c0LewlWD5kCjB6E7kBMI"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8bba6a6554da833c.jpgcac716ff-9e99-4a66-ac55-dc9f9fd39e33?alt=media&token=2e353ab5-8074-4df2-afca-1d01421cee2c",
            "date": "2023-05-01",
            "status": "rust",
            "id": "cHkA5RoA06frolBXvOlH"
        },
        {
            "status": "healthy",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff020893e070f27.jpgef241158-9f18-464c-bd13-4432f65343eb?alt=media&token=9ef64445-3234-43d1-91a3-ceff5265c143",
            "id": "cYt1QNdFm5iirtRrXgGp"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffa09c786f43c052.jpg75fa8ce7-a0dc-45c6-a5d7-5d8ed9c1f0d2?alt=media&token=23db2d1e-5986-4af2-9eb3-2197d085315c",
            "status": "rust",
            "id": "cn72GQ9jucRlPCHVq4bl"
        },
        {
            "date": "2023-05-06",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffeef07b00c1f080.jpgde4f1b8e-9443-4f5d-8c4f-dd0968a74202?alt=media&token=98051778-7a7b-4bd1-b152-684c625fff4a",
            "id": "d2ERU37L6RxQKDCwHiuN"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae697e621956571.jpgee648f83-2758-433b-816a-7d390cd3f306?alt=media&token=2b443f9e-362c-4082-9fff-265b02f51cf0",
            "date": "2023-05-01",
            "status": "rust",
            "id": "d3WVOJiM8DfSwCXtimZp"
        },
        {
            "date": "2023-05-01",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8abacb9cc20ec997.jpg080be96b-4c06-465f-85de-542d1c6aa26d?alt=media&token=761f4e09-f87a-4e5d-85e1-26a9e90e1482",
            "id": "dEFIyVAvPcgr1xpQKpum"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dd6e871109407ef.jpg2e77d12d-6789-4ac4-8cec-a833a2f82879?alt=media&token=b177c752-bef9-4d3d-8caf-7031f5dd3ad0",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "dGrOT5wXHOzfFWM2Ebxu"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faeb43cc08d3ed81b.jpg21dfc030-cffc-4946-870e-6c715aad1f00?alt=media&token=0c4136ed-36ae-413e-a97e-cdf26891005a",
            "date": "2023-05-10",
            "id": "dN0stQb74NLLfAk3iYpb"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ce01ba1856fc6ad.jpg6f3e7d95-664b-4c90-81db-dd07da18ee83?alt=media&token=d6875e74-cddc-4e9a-9001-71c129a5258b",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "dN4vMldmSnT5T0hVnWGB"
        },
        {
            "date": "2023-05-10",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd4528d6f0d8add51.jpgfe5b9a06-9f7a-49a5-8ebb-81191dfadd70?alt=media&token=d6179669-7f41-456c-8c7b-2b5348c8c60e",
            "id": "dcmGtUQnDhPtNNOF08I2"
        },
        {
            "status": "scab",
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9bfb69859c5e08a1.jpg07e8a9c7-81aa-4804-aba5-609f39b3d4d5?alt=media&token=8ba6b10a-d93e-4262-b939-75f375f12c99",
            "id": "ddd2OOVtcSU0Sdj4fumT"
        },
        {
            "date": "2023-05-03",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8fc0349fc7e3a423.jpgb8be7e8c-5c18-4ea4-aa92-d2d01c5584f1?alt=media&token=14a460ff-9c9f-492e-a6c5-d76460356bcd",
            "id": "dfhaX5dBOr5XVAjEtN6V"
        },
        {
            "date": "2023-05-06",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe0b5a25b54ea00.jpg61c4ef72-0443-4ef3-9e5c-82fd5fe40203?alt=media&token=a888882d-cbfc-4bd1-be4f-1e77bea89ffa",
            "id": "dwvxS6Dw14DrDH4BI5Mp"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae77c485ca326565.jpgd59b6a3d-ba14-4176-ac2e-5ce180a85955?alt=media&token=b73cc5a4-e6e3-4eca-8d99-eb14f7de5d64",
            "status": "scab",
            "date": "2023-05-10",
            "id": "e8YvRk6KcX7WRVIYJMIL"
        },
        {
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a966626bbb96c94.jpgfbd64c15-729a-40e7-8a47-1d2c89b4ea8d?alt=media&token=b7f9b090-1730-4297-8be0-4a542dc66fe9",
            "status": "healthy",
            "id": "eKldNZJg7ZEE7L9TBy4s"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd7806f2be4e1d0c3.jpgd79ed28e-a90b-4a9b-9e1f-71cbfcf2a974?alt=media&token=b5ad6006-83a6-41ff-bde5-bb324f49a422",
            "date": "2023-05-10",
            "status": "healthy",
            "id": "eWpSECF0jnsQRCCAYDv3"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af52f087f712a0d.jpge603a23e-c38a-40a2-ac09-7f47a69fa269?alt=media&token=417653cc-3e4e-4463-8010-7ad3770e48df",
            "status": "healthy",
            "id": "eoGkZP67hjAYtfp9wzWR"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffefb948a99412cc4.jpg3c0772d1-e267-4bf0-a2b8-17953cd1a5b9?alt=media&token=6a01af7c-0ca0-47c0-ad10-a96fc6079187",
            "date": "2023-05-06",
            "id": "erqisaCoHXE2ECG0AxSC"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd5811b409d1ddb5e.jpg057c04b4-19e8-4878-8599-538a22ec82a0?alt=media&token=b8959ca2-a43b-428e-af4b-c31eb70d89c7",
            "date": "2023-05-10",
            "id": "eub2xAyrpLXofoCDOEj6"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd8980c8e2ce7f762.jpgf062f1da-8670-4d68-8abb-4349a0d95c22?alt=media&token=836d9f1e-4e9c-4f3c-9c66-aa0abced5778",
            "status": "complex",
            "id": "f7rE8KJ80DPOO4DYn5IQ"
        },
        {
            "status": "healthy",
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff9c005c2c738c2.jpg9af41980-e37f-4a92-b145-642c782fc1b1?alt=media&token=bfc6b216-a9ef-4932-88b0-6b518424261a",
            "id": "fBQHUCSrz1vr9017kIzr"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8f2cf0dd844cae4b.jpg2babe554-86b0-454a-9906-d2bc981d717f?alt=media&token=8d45c532-2f92-425d-aeef-8323ecccddd4",
            "status": "complex",
            "date": "2023-05-03",
            "id": "fS8fAQXlyfMrDUS2d1qh"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Faec6c4976fdd3100.jpg50d949b6-5ecc-4561-b5af-4feda11b05db?alt=media&token=e1f0d5a7-6604-46ec-a9b0-72cbdf63dcad",
            "date": "2023-05-10",
            "id": "fjKyKTYarUvbQPbIukA8"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ec7e5321f0b48ae.jpgba83d770-86bb-4093-aba3-c2f4d7627b82?alt=media&token=64b1f875-ea07-478e-9354-3f3f64c0d267",
            "status": "complex",
            "date": "2023-05-03",
            "id": "g56dY8Ziai4HGGoXEtjD"
        },
        {
            "status": "complex",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ad5953859e948d7.jpgc5315601-fedf-4ceb-87de-70bfad74bb5f?alt=media&token=5f7fd3c2-d24a-4c21-9176-a7abb905378d",
            "id": "gAnB9OoqJxIaV90D98JN"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feaa1c1d575889c3b.jpgc31e1770-71f0-4128-81d8-ebc1dc6aa22b?alt=media&token=bc6a4382-16b3-4f2b-a0bc-92bc75f9fae8",
            "status": "rust",
            "id": "gFHk6EjNNvf7KNehBXZT"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd72482b49f346ad6.jpgcff91540-6a5f-4a0f-8f0f-53ac7eaa1859?alt=media&token=d307a541-4e90-4354-82f5-fd0b2e6577c7",
            "date": "2023-05-10",
            "id": "gZtLv4zJXsP9Uhr3rr9M"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ae0ca99567ea836.jpg5cf13a50-d26f-466b-925f-2007143df1f2?alt=media&token=7d8815df-28b0-49a8-9de7-8745f4a94419",
            "status": "scab",
            "date": "2023-05-04",
            "id": "gh21bW5ShYmgK1c8Pe6i"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffd4c5088f4605a7.jpgfadcb9d9-e7a4-47d7-9317-468436d332e4?alt=media&token=57154d62-55e8-4551-ab7d-45d283bd2d6d",
            "date": "2023-05-06",
            "id": "h4FhqOj7ItpAlGzqfHNM"
        },
        {
            "status": "healthy",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a8437e6c25f2bc9.jpg0b73c896-0d8c-459e-88a4-f28cfa95823d?alt=media&token=ad43262c-452c-4f62-af25-4f67f08c11fe",
            "id": "hicsG9Cyci90BNGW3jg8"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87fa3f21f4659034.jpgf536bdae-27a8-4c5f-bb99-f464f7a16672?alt=media&token=739023fa-4ae9-436f-af98-858cfc9a2c37",
            "status": "complex",
            "date": "2023-05-04",
            "id": "hweIMcawtZJOkEiXs1eb"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5b7c20f43016b95.jpg751d11d5-221e-43f8-b944-4a2f240f6bf7?alt=media&token=99998a7a-1636-48bc-bab3-fa792a711cc7",
            "date": "2023-05-08",
            "id": "hyXd6Fk2ywSprtl3Fh4f"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd17066c7fd242d0d.jpg67470bbe-2f79-47f5-aeae-186f48cb0a29?alt=media&token=ad93ce77-a781-40f5-b08d-36302c970812",
            "status": "complex",
            "id": "i9H3nk5uBg1rTWn1qXVF"
        },
        {
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b7ef0421e19ae5a.jpg681f480d-38d9-47c0-a373-bcc16210c8ae?alt=media&token=38e4ca87-4aab-402e-8efc-d972b1a81636",
            "status": "rust",
            "id": "iAfKuNri0CfRgBWXXTET"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9da962971ee83a91.jpg2ca02d6c-50d5-404d-8a91-933e89884a08?alt=media&token=109ac341-431c-4f4e-a637-3479d224511c",
            "status": "scab",
            "id": "iO6KW22ivMPcUrqXrkpf"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc2f5cea0b18bccc9.jpga2ffc264-d4e5-4732-b18e-e32fef803fd4?alt=media&token=76030a71-5f1e-473a-90d0-752ab0708a4c",
            "status": "complex",
            "date": "2023-05-05",
            "id": "ic8VpolvAu5KS5NLaxmc"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdea33c5c0347aa4d.jpg5bd39f91-af55-4c17-ad3b-f36b51d8d9ef?alt=media&token=06132b17-fda6-409a-92ca-df198419fdaa",
            "status": "complex",
            "date": "2023-05-10",
            "id": "ifhvfirqggMrpph8Wsqa"
        },
        {
            "date": "2023-05-02",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ab073c5dd79a2a8.jpg396884a1-9866-4aa0-b34d-405e3b1f7ea3?alt=media&token=59efd1a5-5773-440d-90cf-50c5f6853165",
            "id": "ikGkJXN4PTau7kSSJIBg"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffffb900a92289a33.jpga73c33f1-774f-4c99-aafa-5da84dc56e9b?alt=media&token=f5ff39e9-df7b-40c0-8a53-31e0cb30ab88",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "j1yvqavVKzWHx7mSWFTD"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c07398297b98c9f.jpg44a7d949-035c-4b29-9f18-b6c8ce789666?alt=media&token=44846649-0b1f-4f50-b84b-ad76b66bbd62",
            "status": "scab",
            "date": "2023-05-05",
            "id": "j3KTpTtqAcQFnOUVW4vk"
        },
        {
            "status": "scab",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b2ed323c3d1d499.jpg1c850e48-0d5d-4cda-90e2-bb872ff50e97?alt=media&token=54b266a0-3c64-41fe-a4ed-a8dc0989a691",
            "id": "jRCjrmbeS4U1rJVdSLbc"
        },
        {
            "status": "scab",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a9a1e72a7ac507d.jpge716e0ed-32ff-47c5-b7aa-1985b67c2f9e?alt=media&token=1d05a135-6bef-4782-830e-46b521e67596",
            "id": "jWBId4DuLtXs8OQZC3Jb"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff91c6f060bb3109.jpgdff4c1f3-22e7-4808-b60f-7c90d20b2ce5?alt=media&token=f7c3336c-d899-41f3-9ad6-f169df367d65",
            "date": "2023-05-06",
            "status": "complex",
            "id": "jYnP18Z2mIsKNwWVCb4F"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9f9c55656a4592b2.jpg1ddd8be6-96b8-42e8-bfc9-f4380b0b096c?alt=media&token=02c8269b-e20e-4bd9-9db1-16943df04508",
            "id": "jlJmPXdue727NGB993I7"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8abc65c20f33e4da.jpgae242c06-f470-4502-ab2c-c1fcb23e2d14?alt=media&token=ef36a50d-a139-4aa2-8ddd-b528b9f6132d",
            "date": "2023-05-01",
            "id": "jtwy99sgBEwJwVA2kUSy"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ae47d252a8ed53a.jpga1d44094-1a88-400d-90f6-bc836d6e4e83?alt=media&token=652674e6-c62c-44d0-b612-014c095256ec",
            "status": "healthy",
            "date": "2023-05-03",
            "id": "juuFidQOmDPmiVAY3n1G"
        },
        {
            "date": "2023-05-01",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a70aa5145aeb3af.jpg903f9a77-69fc-4cd8-a17c-24d88c37d9ed?alt=media&token=066a4a89-1397-4b93-ace2-23fb11474738",
            "id": "k1rChzO3u4G8ACeeSY9I"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b5295986c998bf9.jpg3404c5f4-c893-44eb-92b4-d182e706fc25?alt=media&token=144a8a96-7cad-4d93-9c98-1af562d4aa4b",
            "date": "2023-05-03",
            "id": "k50F5FvU8V9GORXyLbqL"
        },
        {
            "date": "2023-05-05",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc5b72c2a24924df7.jpg505534a5-bd57-4ad0-92dd-4b6ae80076b9?alt=media&token=44fccf36-bf36-48cc-9711-5f46a429f590",
            "id": "k9INjnLfQ1Z4sX4GJASY"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd4221a87cf2f5569.jpg974d6769-b196-43a5-8fcb-a11366a56928?alt=media&token=e03fc1e8-e561-4197-b912-09be5ec49a04",
            "date": "2023-05-10",
            "status": "healthy",
            "id": "kAAfbzE4UxH7xmFjSfBI"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa9fb8695d261916a.jpgd94bbbeb-1213-4c0e-b60b-75074ffbbd07?alt=media&token=a4ba76c9-2354-4818-9788-6fe3987770c3",
            "status": "rust",
            "id": "kBu6XeC2HFfpK2bZSURp"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc1e0d943f5256a9b.jpg4aa7316d-7870-41e4-8b38-fdba07267be6?alt=media&token=59f4e105-4462-4a8e-bad6-63de8785eab9",
            "status": "complex",
            "id": "kFV0O233agZcBHtWGuop"
        },
        {
            "status": "scab",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ae2d58b6cee05a2.jpg70e8b93f-cf31-4d51-86fe-b3b558d7e009?alt=media&token=a7f6f760-d38f-4c1d-971f-4e9c8437817e",
            "id": "kx3LIxwDXTFrGDzAyjp8"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d6a6499354e3197.jpg8b2d71e3-535d-4a3a-a36b-eb7d0f17555e?alt=media&token=68cd3a4e-7859-46fd-bd5b-f50b9055224e",
            "id": "kzm1mUUat8TFAY9nRGtP"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fc5d171c182aaed3b.jpga497ab91-2980-4b75-bddf-6aa6b17f6354?alt=media&token=0ad4e0bc-dc64-40ad-b337-f7ab3b4a56da",
            "status": "complex",
            "date": "2023-05-05",
            "id": "l3bYXLzFdnt8isZ66wEy"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feaa5c70a97f4a42a.jpg93152e45-662a-4481-bd4f-7c7c080710bc?alt=media&token=ddfc0916-de2a-4749-b144-e5d979edbd6d",
            "date": "2023-05-08",
            "id": "lVNo0ko7u30rVIDFjohB"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dff08c36ca1037a.jpg3c23f737-d74b-48b8-ad73-01fc56c30472?alt=media&token=21693765-e381-44ab-b533-5f6287e0f881",
            "date": "2023-05-04",
            "id": "lWVkGCmLoeYElsV0DWI4"
        },
        {
            "date": "2023-05-03",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d5032d4cc1e3e5f.jpg47adbe4f-6cda-49f6-9772-2a2efc37779e?alt=media&token=1aee3e85-29b9-423b-a576-130bec5639af",
            "id": "lfuXxU7duj2hDxp92Rwo"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae394ab08193ff61.jpg979183a2-e537-4904-8c7e-c37f5cb79279?alt=media&token=19473d20-c23b-4555-92c5-a6e9421d9d3f",
            "date": "2023-05-10",
            "status": "scab",
            "id": "lhv2JYayhwPysv7v1S62"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffffe472a0001bd25.jpg6fdc3096-26e3-4701-b78b-dfe2395caec3?alt=media&token=03028947-62ab-475f-89e6-9cb8819dae33",
            "status": "healthy",
            "date": "2023-05-06",
            "id": "li4eF2aBdctICbovT4ha"
        },
        {
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a1e845e8e2ebf2c.jpg927f860d-dddd-4f4f-a2c6-0e5f090bdae5?alt=media&token=a26fda13-3a9e-4498-8628-cc324e3831aa",
            "status": "scab",
            "id": "lkkvZuNfzX63mmWB1re0"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0bd8c0303faf3a8.jpgca351ba0-1df1-4145-9bd0-8ed19f8dbe27?alt=media&token=e85eba31-a41b-4173-af7d-009d4073cabc",
            "status": "healthy",
            "id": "m79rK0RcPELnatVBLprV"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8bac287ea7715dc0.jpg3687f4c1-81c1-4732-a11d-1e57d9c1faf8?alt=media&token=db734f6d-3c24-4d26-b7d8-7c4252099f77",
            "status": "healthy",
            "date": "2023-05-03",
            "id": "mBZEgftxfIo2AtQ27yOq"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9db89d41603e0fb3.jpgad083fab-f0ce-4549-9a94-58885290b1dd?alt=media&token=1ee7e404-a505-4cee-8ed2-ce3f5faebe44",
            "id": "mIF43JbMj9WHOFHw79hk"
        },
        {
            "date": "2023-05-08",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea7bcc42601f7417.jpg1c124c1d-b0fa-46af-801f-55408fa3ab89?alt=media&token=7f18f145-e680-4f26-99c3-0c79b4ef65a1",
            "id": "mkN6xrJZ1QhvboNKLxTk"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a1b387a99311bf5.jpgc80afb31-11c3-41fa-98f2-d39425e5e612?alt=media&token=e49cbfca-37f9-4fbb-9912-208c482fac74",
            "status": "scab",
            "date": "2023-05-02",
            "id": "mvFxrlPGg1XhMc1GBEFq"
        },
        {
            "status": "scab",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ac74a26879f497c.jpg771c01e8-4861-4d9e-a9ef-d64ae8276d41?alt=media&token=cdfb56df-8580-40ec-a6a2-b1a4f66e46cd",
            "id": "nEp9SjjbjZ5KFlgAuUL9"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5c8b824c388e71f.jpg341a0e3a-7d22-4dd4-8611-04bf5b1d6e20?alt=media&token=0a5f9a76-4267-4d04-b224-02470cd74528",
            "status": "scab",
            "id": "nFMnNjYkUzWeuU3w2gHx"
        },
        {
            "status": "rust",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa26bd8e27025b3bc.jpg58da2309-10f0-4323-a8a1-f09d2c88f3ca?alt=media&token=47424413-b8ac-4c2a-a9a7-27f6dbcff96f",
            "id": "nH1qUA01tQZ321WqdtZq"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87a5e0dc30674b79.jpgf8281842-f472-472c-94a7-2da32be4955d?alt=media&token=5f493018-0303-4521-a9ea-1314a1736c5e",
            "date": "2023-05-04",
            "status": "complex",
            "id": "nSRlTK1HO0vjCMB9Qcj9"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffcbc7d2e030e050.jpg5afe5d33-44d1-488e-9db6-c8592dd71280?alt=media&token=35ff034a-ed54-4df6-a6a3-5f313f0c534d",
            "status": "rust",
            "date": "2023-05-06",
            "id": "oHtr3e7lAzeBHvd9UaF7"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8fe052170f4385fd.jpgfcb63673-00cc-44b7-ad35-3650575c8a5a?alt=media&token=951ab4f6-0b8e-41e5-852e-03ddc652e49c",
            "date": "2023-05-03",
            "status": "complex",
            "id": "oJJ4CgxBWx7QE159waD7"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8f784d61708e6e33.jpg674dc119-70eb-4f87-af84-4c666f2ba1ba?alt=media&token=0d92ed41-328a-4d3f-bdc7-cab794ab77e0",
            "date": "2023-05-03",
            "id": "onqxT91lLouuA6WGz2il"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F86f25a8f4a31652f.jpg33a092a8-ec32-42c1-bc5d-79d113f1a47f?alt=media&token=8cf3e093-db9f-4b32-9a84-f703ae2b5290",
            "status": "complex",
            "date": "2023-05-04",
            "id": "opD5AfceoCFRih8ZC97g"
        },
        {
            "status": "rust",
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fea65c546c48e3ecc.jpg82538339-ad04-43f0-a6b1-ed2118b6238e?alt=media&token=7086aa20-1cd6-4a15-9523-302eeb6c2ea3",
            "id": "owxipXCIWvha3dUvp3dz"
        },
        {
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa17cd35c5abea882.jpg20929c03-3c3d-4c4f-b2ce-8978974bb4cf?alt=media&token=79f98640-ce86-47a8-af95-a49e4e20cebc",
            "status": "rust",
            "id": "p4PuhMyxo0wvaXfzG1dg"
        },
        {
            "date": "2023-05-08",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5ce946d4bb02916.jpg2d594b5c-92c1-4c88-8b15-3c36adb39600?alt=media&token=b5ae5003-cb0e-45c3-b892-6aeeabaa2941",
            "id": "pIkv5sctdOBb6bqG2dri"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0cacb951cd073e1.jpg9525d1da-8857-4297-bc35-a64c814b6501?alt=media&token=d7810cf9-4139-41e4-9f95-8e687a36a623",
            "date": "2023-05-08",
            "status": "healthy",
            "id": "pOmSqNJWB8Bmp4or8FpL"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ffff080b2c394cf48.jpg8ee28934-f486-4d6b-a68e-a3e11c4a569a?alt=media&token=3732e0cf-e955-47ca-b07d-73e3e206a6c6",
            "status": "rust",
            "id": "phSLn2xTr3Ai9mSVZUuG"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9b4dd76b61002d9e.jpg2262b7d5-7556-4a09-8945-6d8eb512d473?alt=media&token=c1e4cfe4-526e-43d0-8c14-873249d2da15",
            "status": "scab",
            "date": "2023-05-04",
            "id": "psbqv5lgXiOvNmzzaXR0"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F87c361d0d9ac96f2.jpg3f3a91cc-133f-438e-88c3-7709a606d439?alt=media&token=d008a976-e6b8-4fdf-abde-531f60f9613f",
            "date": "2023-05-04",
            "id": "qL8dmHjAYaPOnlEKZE1t"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8adece06dcc56507.jpg091402b6-c14b-41f6-b43e-2ac491924fee?alt=media&token=2eda6e32-8d18-4a04-8e14-dd6495189f9e",
            "status": "scab",
            "id": "qMVYDMjltW9bF14VLq4m"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dd9370b620d0ee3.jpg50b312c2-8d54-44dd-ba3d-a457e605ae7f?alt=media&token=12b89f64-fa1e-48b6-801f-a74b5ee827be",
            "id": "qMfdh9cG1HP2xTmT7iJj"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffe055548c479495.jpgdeb4530c-f5f2-4820-b53a-e182d3759ca0?alt=media&token=96106cd9-4bb2-47c8-8a63-d021cb635af6",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "qYJokIl4Fd2MYO8yDLEf"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae56545b6981ae5a.jpg700013c1-eb17-41dd-b420-0847c83cf743?alt=media&token=2ecefdaa-e8d2-4d08-9e17-b14ab807a77b",
            "status": "scab",
            "date": "2023-05-10",
            "id": "qZWVQu0r37sG2toqbyR2"
        },
        {
            "status": "complex",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9a848f99794b5396.jpg1686318b-102f-413a-89a7-1ec8dde0c0aa?alt=media&token=cb9a6fa8-94ed-41db-ac91-e42fb833eec2",
            "id": "qdujadUSGeKlUAGB0pJd"
        },
        {
            "status": "complex",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F88ffb8d09d5f101a.jpged845a08-c4ae-4a9e-b99d-c6cbb884ea89?alt=media&token=d11dc909-eb71-4ded-a786-8965dc2b66ab",
            "id": "qepTeESLs24JeCUUfaX5"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd881fa0ed9c833dc.jpg9e26f449-d180-491e-9139-0ccedfcf9f58?alt=media&token=acb7642e-6b29-42b5-a922-bcef01399ebc",
            "status": "complex",
            "date": "2023-05-10",
            "id": "qsl0Y78gxhMmfqbprt7n"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0a0e9665b4e725c.jpgaffc9520-b1da-4c9c-9df9-4beb973b0f1b?alt=media&token=72ed0d54-f5ee-4a5a-a8e8-9d01552ee43a",
            "date": "2023-05-08",
            "status": "healthy",
            "id": "qzlcPXIrSpnlQwCjizj8"
        },
        {
            "status": "complex",
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d4abaa199759c6a.jpg3ef5cd29-bcb2-4515-b5a0-093cc2ed73bd?alt=media&token=d688cb34-eb85-4c2d-adbb-78d69fb5f2cd",
            "id": "rB7xXkfL1eM2hAmhGAgC"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ba57090bab1b593.jpg74612665-9038-4930-a743-ee00e68fa99e?alt=media&token=a16bca4b-8e8e-4351-af21-7a1b9e640727",
            "date": "2023-05-05",
            "status": "scab",
            "id": "rCBEtZZKval8TLphwQXB"
        },
        {
            "date": "2023-05-05",
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d7be083970272ce.jpge2c8a594-e21a-4981-aee4-a095f676d08d?alt=media&token=2c47a579-bd81-4b3f-8519-046ca797f66a",
            "id": "rGaamvXir2p93HR6w00t"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F89a07b36334ef269.jpg03e00f7f-aa20-4535-b68f-4e77611e3457?alt=media&token=e943bfa1-7290-4157-b605-effddcfdf1d7",
            "date": "2023-05-04",
            "status": "complex",
            "id": "rUGvAMtetQXBlmR6Iiqt"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d6b942ed235ca35.jpge2f38ed6-840f-4f2f-a3a6-af21e107e0ec?alt=media&token=65f21938-d2c9-4aa9-a578-5cddd7a8fc1a",
            "status": "complex",
            "id": "rWAKoXBg8zsfnM7k1lK7"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af61aa1f9398ce4.jpg1e5aab45-f063-4158-b944-c14f0cc761c6?alt=media&token=b5324fc5-418c-4d4b-9ff9-df7851d5b26e",
            "date": "2023-05-01",
            "id": "rYj1KUAUu5ImMg8OuqGv"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d48d164ee86678b.jpg0cbcf9d9-599d-4f60-8773-70bc0929ce9c?alt=media&token=fe0e91ae-7129-4f50-9bc2-903f6634dd2f",
            "id": "rqwRdea53Ye3PurkexM4"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a972fc8126ef136.jpgdead526c-c3a5-4936-942f-213b7616e7d0?alt=media&token=63dc434e-a453-4004-8826-a3ed7f921847",
            "date": "2023-05-02",
            "status": "scab",
            "id": "s9LJ8toObbHxAkYvL70O"
        },
        {
            "date": "2023-05-04",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d788a91891b8f79.jpg0b847acd-27c0-4063-8a00-04e4550745ee?alt=media&token=e43db950-944b-4df4-9f76-06b90b2d8086",
            "id": "sACqOFlEmqH1nrJw2zvT"
        },
        {
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a86d49f916a2b6d.jpge3e1018f-036d-403f-9f15-17bb1927cd95?alt=media&token=deebb89a-2b49-4eaf-967a-13b276650de7",
            "date": "2023-05-01",
            "id": "sk6MBERlPzEaRvqvoaPZ"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b1fba5efa125418.jpg671b07ea-82f8-4101-a945-976850abfddc?alt=media&token=cffcbb86-6874-494f-96d2-3ba1081bf466",
            "date": "2023-05-03",
            "status": "healthy",
            "id": "swUfMM0sDWBlk5nKFkNQ"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ad42c4b87774762.jpg9eca4788-f82a-47bf-8fae-2fe600568b3b?alt=media&token=0d7b10fd-a588-45d7-8b31-5dfe29d8d886",
            "date": "2023-05-04",
            "status": "scab",
            "id": "tBQFhSSGsgtVmCBAZmsj"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8e83dac669f0347a.jpgc2d08335-5027-4229-a005-c0db24539e6d?alt=media&token=ea765901-3831-4310-b35c-29f69e903fb7",
            "date": "2023-05-03",
            "status": "complex",
            "id": "tnA0TPMIwCQnKEO3aktq"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff0bfdbc108a0f88e.jpg1999f21b-8772-47e2-9fe9-2caf457a9b7a?alt=media&token=edcab411-cdd8-4510-bb09-b2a437ede81f",
            "status": "healthy",
            "id": "uBrhQ2Ktedklc0oZL51U"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9c3774083b47d8e3.jpg1db3386a-71be-44f0-8d0c-8aa8a07b8eb7?alt=media&token=f2576cef-1847-4017-894f-70f5e485a3e6",
            "date": "2023-05-05",
            "status": "scab",
            "id": "ubFRpvt3nsLgHubU2POY"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa56af43d3cb0a296.jpga7c3ec2e-f1da-4fb0-9843-f73b9d588e51?alt=media&token=028443c8-e0df-4fe6-b9c6-b5d0bc46c2ba",
            "status": "rust",
            "date": "2023-05-10",
            "id": "uffL1z7sULDUjgfQFsV6"
        },
        {
            "status": "scab",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ad55acf93ec9308.jpgd9a9ff92-2317-4f86-9b09-200f6823c803?alt=media&token=e25632d0-a475-4254-8dcf-309634d70cf3",
            "date": "2023-05-03",
            "id": "uycIm8D7PIoEpLm8rsKz"
        },
        {
            "date": "2023-05-10",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fde96253c36da40c7.jpg1fca637c-057c-4aa4-a3c3-c927a352feb2?alt=media&token=7a85b649-a294-426f-b9aa-820a64dc9730",
            "id": "v7lRKL5FOHqL2CgxjICz"
        },
        {
            "status": "healthy",
            "date": "2023-05-01",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a695cd7e4533513.jpg8469133f-2aff-4e24-b1f2-890367263d4f?alt=media&token=2a060a83-1cc8-4e38-b41b-53025c6535cf",
            "id": "vCvH7fauVmcYph2rC1FD"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8aba6e9603cf27c2.jpg58f76cd4-ae46-46b3-a565-fcd2c10f3d9e?alt=media&token=3a64b59c-b3bc-45d4-a809-90dbd83741ea",
            "status": "healthy",
            "date": "2023-05-02",
            "id": "vQX3htqzIayvB4FfNbLd"
        },
        {
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8feed8d130af2258.jpgc84e8a00-dd16-4f43-ae02-35b5f15d560c?alt=media&token=91ac6110-0f9b-45bb-ad11-a8620b6dd385",
            "date": "2023-05-03",
            "id": "vgpQ2uIYA1h8gIgzLzHs"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fffde86c09c943891.jpg8ebed4bc-548a-4c0a-817d-1e6aaf1580a8?alt=media&token=a560baae-8e1b-429f-b9c3-fcf54119a516",
            "date": "2023-05-06",
            "status": "healthy",
            "id": "vlJXttoxqKndZMigsTdg"
        },
        {
            "status": "scab",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a2d7d9ecad0e81c.jpgdf8adbf0-592e-4185-8a39-d12965c74e2b?alt=media&token=fb8ddc83-aa3b-4fae-a858-64f0e3a13bad",
            "id": "vyE80ogPqPE0YLeRkrCO"
        },
        {
            "status": "complex",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fdf90901ccb664de6.jpg42aeed4e-9ff2-4307-ae0f-2729ccc916c4?alt=media&token=0cc8dc17-f41f-4f50-a717-784fa9c8f9c4",
            "id": "w3TpPWayVBVVYtnuPxan"
        },
        {
            "date": "2023-05-01",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a9e5c177d273168.jpg7beeddce-0af9-49c8-81c0-b404c970f410?alt=media&token=18f1570c-bb8f-4527-b38b-8476d76962d9",
            "id": "w4cAh8BA0UicvHa6MhUK"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8af86da87ce164c6.jpg533972b1-1a26-4912-92b5-24b8efcd2f2c?alt=media&token=89ed00c7-5e2b-4940-8623-42598396b041",
            "date": "2023-05-03",
            "status": "healthy",
            "id": "wFcfeoARKbxHecCrM4r7"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Ff5c2813a3131abcf.jpg1c7f8adf-c52b-43d7-af82-5ed85e2801cf?alt=media&token=716a0be5-6982-4fbb-9720-99523a25671c",
            "status": "scab",
            "date": "2023-05-08",
            "id": "wFiXEUb0KJGrTcN7RiBI"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa54bc00bb52fea56.jpg88247269-0487-4e0e-9db5-508b4e2b3115?alt=media&token=47474fb7-c759-4fd0-baf4-a2d170388863",
            "date": "2023-05-10",
            "status": "rust",
            "id": "wK0ydXl2QdvYxpI4XTU6"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8a5c2ed32fdb6882.jpg892d9d46-5f71-44b4-8e78-e6cdc41b630f?alt=media&token=819c76bb-e645-4748-9489-15e2d5fae5a5",
            "status": "rust",
            "date": "2023-05-01",
            "id": "wccJqtaeG2OnMyJ4VAJr"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9dd8c28cca8d99e9.jpg8f2f806b-2d7e-4b85-9ae8-bdb38c9af0fb?alt=media&token=d7c66f06-b496-42ff-a894-4f5f09fc89bd",
            "date": "2023-05-05",
            "status": "scab",
            "id": "whvPv89ZroL54DUt3vsD"
        },
        {
            "date": "2023-05-02",
            "status": "healthy",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ab4b539357111fa.jpga91aba8f-e482-4c27-be61-c8803bd77e6b?alt=media&token=f0292c14-f36f-4c65-9f56-91a08aa6c488",
            "id": "wlKGGN8mjlLz0Qi0vLeu"
        },
        {
            "date": "2023-05-03",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8ba1f83ded8204eb.jpgb580f4df-83e0-4951-ac55-59b7f99ac416?alt=media&token=dbc8ecdd-58bb-4114-a51c-a02e7486a55e",
            "status": "healthy",
            "id": "wo0FIDtA1Pl8rHbgS5Bn"
        },
        {
            "status": "complex",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8acce5ad262e3a78.jpg05cb8e6c-57eb-49a2-a476-8cd8a0e32205?alt=media&token=5f476e9e-fe09-42fa-b59a-9efa2454fdbf",
            "id": "wp0ikf7RntqTaeOlq5m1"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8b534adf4c8a3c35.jpg3f4def60-21b4-4b3e-9a5b-14b3e66aa249?alt=media&token=0adb361b-f388-41b1-af01-c42e925469a2",
            "date": "2023-05-01",
            "id": "xPLBxjyPZzF02p7ZWjVx"
        },
        {
            "status": "scab",
            "date": "2023-05-10",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae703e5afd417540.jpg1e6332ec-fdb3-448f-814a-2d337e185c97?alt=media&token=01f62600-61f7-4b5a-97ac-0ed166500e6b",
            "id": "xVplefGsjPmLHONWCbGJ"
        },
        {
            "date": "2023-05-06",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fff78c07e00052f9b.jpg2f9242d5-d1f2-4a2d-8344-16ec6c257514?alt=media&token=c22a156d-119e-4d58-8581-7907f05f209e",
            "status": "complex",
            "id": "xgdNXQlwHTxNpD7OUBlU"
        },
        {
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa31e87b16045fde4.jpg14bd1dd5-475f-43f8-85b4-eac8896d7cb5?alt=media&token=f81d2efc-3d38-44b0-bf4d-c2c26467de2a",
            "date": "2023-05-10",
            "id": "xpb2IzXYxmYDClxbJZgV"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd9096bd4a497b493.jpgc78a2a98-5ec4-49d1-8708-c6dc1517a3b1?alt=media&token=34e6db6e-c84d-4843-a64b-998ec95916d4",
            "date": "2023-05-10",
            "status": "complex",
            "id": "xw5zCzvPMRAsWLdm2RnL"
        },
        {
            "status": "healthy",
            "date": "2023-05-04",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9d6acb154f9932c8.jpgd2c3f3af-31af-466a-ac03-907b6a48b343?alt=media&token=0d0d9b93-fe4e-4046-936b-e49c775b2ea9",
            "id": "yUOfbGHPlRMy2rL9BT4B"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fae3996698871946f.jpgc614b5b4-14fa-41e2-a5b8-d7eb185cdc1b?alt=media&token=40e1600e-a795-42ae-8887-48686a2dfe1d",
            "date": "2023-05-10",
            "status": "scab",
            "id": "yi5Fn1VMvjjs6En1bzwe"
        },
        {
            "date": "2023-05-10",
            "status": "rust",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa37bd4a0d8d67648.jpg24974b51-328c-445f-8b9d-dda77ec8437a?alt=media&token=7df4d226-484a-4eff-94f2-0923d29a897d",
            "id": "yossUiHv2O3Ug6qU5LQ7"
        },
        {
            "date": "2023-05-10",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fd8047c2b34d7a0df.jpgc2a5c99a-dcaf-4e1f-bab2-87891add41ea?alt=media&token=75cb13d6-4e94-4e0e-9114-4991b105ee70",
            "id": "z0fUqh88N1iZL1ynFLhc"
        },
        {
            "date": "2023-05-03",
            "status": "complex",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8eea38f671078695.jpg9b576e31-4dd5-4a1d-8075-1561f106a26a?alt=media&token=e8ce909d-5187-4278-b4d7-8289ae96414e",
            "id": "z7TMlQCkADqhlNblDIgz"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9de438c9654b0af5.jpgad83507e-3821-4639-a9d5-eb4e444001a2?alt=media&token=6480385c-5a58-48ea-843e-f45c90f9f3a5",
            "date": "2023-05-04",
            "status": "healthy",
            "id": "zD62C6qMxaVuHJkErWw4"
        },
        {
            "status": "complex",
            "date": "2023-05-02",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8afa9687aab53506.jpg9e967f38-1e63-4b05-94c2-e70474067d18?alt=media&token=6ddfb4c0-d501-491d-bec6-fcb7390cad96",
            "id": "zG4sinAcC3ZQJzoc8rQr"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F8d5af4a1b346b0e5.jpgc8fe1de1-a6e3-4f79-ad06-ec30fb078904?alt=media&token=bbf14210-ceda-4235-8c4a-279c2d30fc51",
            "date": "2023-05-03",
            "status": "complex",
            "id": "zTg6tQOPUUo6hZK5sKUq"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feb72c48380bf8b9c.jpga83365f2-65fa-477c-ab74-87cce27d7673?alt=media&token=7be07e1f-bb9f-4b25-9a91-e42c545a5cf1",
            "status": "rust",
            "id": "zgsXSq3dpCwAR7o1DfAE"
        },
        {
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feaab759780fe0838.jpge489c3a6-9925-403d-865b-4867386385f2?alt=media&token=49c78313-6cc9-4b44-af6b-20a1d851690e",
            "status": "rust",
            "id": "zhYvrnCRBcgQvLzfHT2D"
        },
        {
            "status": "rust",
            "date": "2023-05-08",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Feab016bceba8296c.jpga4d53c8f-6a80-4326-a411-8ec61b6b1e36?alt=media&token=6dd386de-715a-4db5-8fb5-a2c6a41d2c9c",
            "id": "zlqZPU5MUHyxRwSAifKA"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9ba78d199a6f20e1.jpg88dae712-1bb8-413a-9958-ff07932c82f7?alt=media&token=09b1250a-df97-4faa-8bea-ca033325b6f9",
            "status": "scab",
            "date": "2023-05-05",
            "id": "zpQVAqmebqFvKwi48CCf"
        },
        {
            "date": "2023-05-05",
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F9cef6060e8f464f2.jpg11b86672-83fc-40a0-96ce-35c9a2b35cc8?alt=media&token=72a1c5bf-94da-414f-bab8-720178e111d8",
            "status": "scab",
            "id": "zxXY1TwMkPnoaHhCHIRd"
        },
        {
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2Fa054d06ad8977dd3.jpg69c84b50-f3f7-46c7-bcf1-645d3491c991?alt=media&token=752bff51-0681-4954-a113-3f4e2686d04f",
            "date": "2023-05-10",
            "status": "rust",
            "id": "zyRqS3Cx8CB4NmDLXDj6"
        }
    ]

    const data = fakeItems.reduce((acc, item) => {
    if (!acc[item.date]) {
        acc[item.date] = {};
    }

    if (!acc[item.date][item.status]) {
        acc[item.date][item.status] = [];
    }

    acc[item.date][item.status].push({
        id: item.id,
        imageUrl: item.imageUrl
    });

        return acc;
    }, {});

    // console.log(items);

    const items = Object.entries(data)
        .sort(([date1], [date2]) => new Date(date2) - new Date(date1))
        .map(([date, obj]) => ({ [date]: obj }))
        .reduce((acc, cur) => Object.assign(acc, cur), {});

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
            <Stack>
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
