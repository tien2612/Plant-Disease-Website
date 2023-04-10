import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestoredb } from "../../components/Firebase/firebase";

const ImageClassifier = () => {
  const [details, setDetails] = useState([]);

  const userData = async () => {
    const q = query(collection(firestoredb, "images"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
    console.log(data);
  };
  
  useEffect(() => {
    userData();
  }, []);


  return (
    <div>
      {details.map((val, id) => {
        return (
          <div key={id} className="pt-2">
            <img 
              src={val.imageUrl}
              alt={`Image ${id}`}
              width = "2000px" />
          </div>
        );
      })}
    </div>
  );
}

export default ImageClassifier;