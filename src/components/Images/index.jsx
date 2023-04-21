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
        first_image: 'https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/valid/Apple___healthy/0e277198-95a0-4700-a7b0-f1881af2b1c0___RS_HL%207285.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230419%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230419T021726Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=3010bc32a4e6f45303ce72c300d57bb11703e5cf4dae7b32b86ffb6bd98917f091649471b44b3cc27087d277e0a194b4efd095b307eff6193dd567c59b9283774afc56c368645edf52e5c331cdebd611cd7c859039710e7de331fed4a746b3db71960f88a25de1027826e04f5b546363ee68f144819c0264e84f00b0a2b0634edc573d48c89ef1ed7348d1f5759d429b6930e1b8cbf44c5f8c5e265c768f23d1da0a6dca347b1cd69f4394589f0017da1778dcc98f8ed2c71d3bc3db83974d321d73e012f6728aa28f4358f6359116de2364f8aade9a70cef50cbfe4443a4b09182f444165fbfa3e2c10bdebcafd5cc9656ab6029c8b59f21c91715f7c8b198e',
    },
    {
        name_disease: 'Complex',
        quantity: 62,
        first_image: 'https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/train/Apple___Apple_scab/01f3deaa-6143-4b6c-9c22-620a46d8be04___FREC_Scab%203112.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230417%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230417T103153Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9045b8ab237e7ca99bb85b4ac6207831218da9234af3ddd89bb54810835df37c5fa5151842de0b16b4a40ceab724cdeafcd46198a79da750232f3703e9721c5d23593aa1e5b0ea30fb8f5e0db81058f3fccb1bcd0fe45c74d8be36b266263c75a2bb826d1a8580abd0a6767595caf1dcef7255b07dd2c7f0dd165acec0f24901ea8d49929560f13063793acb8ea47335e1d44143b28e59345d86d7073872f8649c0d997744612608f9cc9e792d306fda43c62fbabd2269b40bd28c90a2042e0be6e35ffcb0b9f81caaf085b4aabb25e9c48d07c5f8412045096858a60a107a7034ee5a9e95e721940bf146b0ff040c3553083c5ee3241a5713d2ac4c43b6d772',
    },    
    {
        name_disease: 'Rust',
        quantity: 30,
        first_image: 'https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/valid/Apple___Cedar_apple_rust/1cfc6e73-1d86-4fb9-bffb-010163531711___FREC_C.Rust%203944_new30degFlipTB.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230419%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230419T022528Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=342233f4f4c6a099a6445e3d5af49ce562d2af6f37a3262154f55729e5fe02c4dd07ededb25efd9ad37883c5c944310deb0583fd2041e532709ea6e603927511c40879576a10b4aa0c4406e0177432f5eeed573d91b5986e7d02930af370a116eaa80b55efe6ccab8e6a26bf0eb4e0d45ab73b543bb2e14c3e5d2c5796857ead096789cbe53cd86b0ba2d12b701d579faac6f0101533e65a239ca865c1050c0eea1b85b57bd267249ea45b704f5402772c7489adf6fc66567fda8b97a8c60355d35553a20a5c97a49e278e8501af75554c1348f58606194a1671b91ae9aa388e4b3d8ea47ee3e6587fedb0389544f4d23925a5aae002f66ae16b81f57219807d',
    },   
    {
      name_disease: 'Scab',
      quantity: 30,
      first_image: 'https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/train/Apple___Apple_scab/01f3deaa-6143-4b6c-9c22-620a46d8be04___FREC_Scab%203112.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230417%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230417T103153Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9045b8ab237e7ca99bb85b4ac6207831218da9234af3ddd89bb54810835df37c5fa5151842de0b16b4a40ceab724cdeafcd46198a79da750232f3703e9721c5d23593aa1e5b0ea30fb8f5e0db81058f3fccb1bcd0fe45c74d8be36b266263c75a2bb826d1a8580abd0a6767595caf1dcef7255b07dd2c7f0dd165acec0f24901ea8d49929560f13063793acb8ea47335e1d44143b28e59345d86d7073872f8649c0d997744612608f9cc9e792d306fda43c62fbabd2269b40bd28c90a2042e0be6e35ffcb0b9f81caaf085b4aabb25e9c48d07c5f8412045096858a60a107a7034ee5a9e95e721940bf146b0ff040c3553083c5ee3241a5713d2ac4c43b6d772',
    },     
    {
        name_disease: 'Yellow',
        quantity: 30,
        first_image: 'https://firebasestorage.googleapis.com/v0/b/plant-pests-detection.appspot.com/o/images%2F16951e1f-de33-4572-96f9-4be312c55d6b___UF.GRC_YLCV_Lab%2003213.JPGac8763bc-5c7a-4028-a30d-4ae650345e2d?alt=media&token=ddc2f4ae-0068-4ea6-902b-141f323ccc37',
    },     
    {
        name_disease: 'Pests',
        quantity: 30,
        first_image: 'https://plantix-community-cdn.com/w400/2dd77402-5041-43e9-ad15-428afe9127a5',
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
    
    const info_date = new Date().toLocaleDateString('en-US', {
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
