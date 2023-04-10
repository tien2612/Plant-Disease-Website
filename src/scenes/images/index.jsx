import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import ImageClassifier from './index-page2';

import './index.css'

const api_image = [
    {
        name_disease: 'Healthy',
        quantity: 310,
        first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },
    {
        name_disease: 'Complex',
        quantity: 62,
        first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },    
    {
        name_disease: 'Rust',
        quantity: 30,
        first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },   
    {
      name_disease: 'Scab',
      quantity: 30,
      first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },     
    {
        name_disease: 'Yellow',
        quantity: 30,
        first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },     
    {
        name_disease: 'Pests',
        quantity: 30,
        first_image: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA',
    },      
]


const BoxImage = (props) => {
    return (
        <Link 
            className="box-image"
            to={{
                pathname: "./index-page2",
                state: { imageClassify: true }
              }}
              
        >
          <img 
            className="img-disease"
            src="https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA" 
            alt= {props.name_disease} 
          />
          <div className="info-image">
              <h1>{props.name_disease}</h1>    
              <h4>{props.quantity} images</h4>
          </div>
        </Link>
    );
}

const Images = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const date_of_data = new Date();
  const info_date = date_of_data.getFullYear().toString() + '-' + date_of_data.getMonth().toString() + '-' + date_of_data.getDate().toString();

  return (
    <Box m="20px">
        <Header title="Images" subtitle= {info_date}/>
        <div className="wrap-layout-image">
            {
                api_image.map((items, index) => (
                  <BoxImage 
                      key={index}
                      name_disease={items.name_disease}
                      quantity={items.quantity}
                      first_image={items.first_image}
                  >
                  </BoxImage>
                ))
            }
        </div>
    </Box>
  );
};

export default Images;
