import { Box, useTheme } from "@mui/material";
import Header from "../Header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.css'

const api_image = [
    {
        name_disease: 'Healthy',
        quantity: 310,
        first_image: '/assets/healthy.jpg'
    },
    {
        name_disease: 'Complex',
        quantity: 62,
        first_image: '/assets/complex.jpg'
    },    
    {
        name_disease: 'Rust',
        quantity: 30,
        first_image: '/assets/rust.jpg'
    },   
    {
      name_disease: 'Scab',
      quantity: 30,
      first_image: '/assets/scab.jpg'
    },     
    {
        name_disease: 'Yellow',
        quantity: 30,
        first_image: '/assets/yellow.jpg'
    },     
    {
        name_disease: 'Pests',
        quantity: 30,
        first_image: '/assets/pests.jpg'
    },      
]


const BoxImage = (props) => {
    const navigate = useNavigate();

    const handleBoxImageClick = () => {
        navigate("/images/box_images/details/", {
            state: {
                date: props.date,
                items: props.allItems,
                totalCounts: props.totalCounts,
                status: props.name_disease,
            }
        });
    }

    return (
        <div className="box-image" onClick={handleBoxImageClick}>
            <img 
                className="img-disease"
                src={props.first_image}
                alt= {props.name_disease} 
            />
            <div className="info-image">
                <h1>{props.name_disease}</h1>    
                <h4>{props.quantity} images</h4>
            </div>
        </div>
    );
}

const AllBoxImages = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const date = location.state.date;
    const allItems = location.state.items;
    const totalCounts = location.state.totalCounts;
    const navigate = useNavigate();
    
    // Update api_image quantity with the totalCounts
    const updatedApiImage = api_image.map((item) => ({
        ...item,
        quantity: totalCounts[item.name_disease.toLowerCase()] || 0,
    }));
    
    const info_date = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleBackButtonClick = () => {
        navigate({ pathname: "/images" });
    };
    
    return (
    <Box m="20px">
        <Header title="Images" subtitle= {info_date}/>
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px'}}>
            <ArrowBackIcon 
            onClick={() => {
                handleBackButtonClick();
            }}
            />
            <span style={{ 
                display: 'inline-block', 
                textAlign: 'center', 
                lineHeight: '24px', 
                fontSize: '25px', 
                marginLeft: '5px' 
                }}
            >Quay lại</span>
        </div>

        <div className="wrap-layout-image">
            {
                updatedApiImage.map((items, index) => (
                    <BoxImage 
                        key={index}
                        name_disease={items.name_disease}
                        quantity={items.quantity}
                        first_image={items.first_image}
                        date={date}
                        totalCounts={totalCounts}
                        allItems={allItems}
                    >
                    </BoxImage>
                ))
            }
        </div>
        {/* <UploadForm /> */}
    </Box>
    );
};

export default AllBoxImages;
