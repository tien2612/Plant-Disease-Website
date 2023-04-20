// import { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "../../components/Firebase/firebase";
// import { firestoredb } from "../../components/Firebase/firebase";
// import { v4 } from "uuid";
// import { collection, addDoc } from "firebase/firestore";

// const UploadForm = () => {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const imagesListRef = ref(storage, "images/");
//   const uploadFile = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls((prev) => [...prev, url]);
//         console.log("urlhere",url);
//         const usersCollectionRef = collection(firestoredb, 'images')

//         const addImage = async () => {
//         const document = await addDoc(usersCollectionRef, {
//             date: "2023-04-19",
//             imageUrl: url,
//             status: "scab",
//         })
//         }
//         addImage();

//       });
//     });
//   };

//   useEffect(() => {
//     listAll(imagesListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageUrls((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);


//     // const usersCollectionRef = collection(firestoredb, 'images')

//     // const addImage = async ( {}) => {
//     //     const document = await addDoc(usersCollectionRef, {
//     //         date: "2023-04-19",
//     //         imageUrl: {imageUrl},
//     //         status: "healty",
//     //     })
//     // }
  

//   return (
//     <div className="App">
//       <input
//         type="file"
//         onChange={(event) => {
//           setImageUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadFile}> Upload Image</button>
//       {imageUrls.map((url) => {
//         return <img src={url} />;
//       })}
//     </div>
//   );
// }

// export default UploadForm;



import { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../components/Firebase/firebase";
import { firestoredb } from "../../components/Firebase/firebase";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    if (images == null) return;
    const promises = [];
    images.map((image) => {
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrls((prev) => [...prev, url]);
        console.log("urlhere",url);
        const usersCollectionRef = collection(firestoredb, 'images')

        const addImage = async () => {
        const document = await addDoc(usersCollectionRef, {
            date: "2023-04-28",
            imageUrl: url,
            status: "yellow",
        })
        }
        addImage();

      });
    });

    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

//   useEffect(() => {
//     listAll(imagesListRef).then((response) => {
//     response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//         setUrls((prev) => [...prev, url]);
//         });
//     });
//     });
// }, []);
 
//   console.log("images: ", images);
//   console.log("urls", urls);

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))}
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))}
    </div>
  );
};

export default UploadForm;