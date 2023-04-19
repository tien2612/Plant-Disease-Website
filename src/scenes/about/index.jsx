// import { Box, useTheme } from "@mui/material";
// import Header from "../../components/Header";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { tokens } from "../../theme";

// const About = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <Box m="20px">
//       <Header title="About us" subtitle="Plant Diseases and Pests Detection" />
//         <div>
//           <p>This is our Plant Diseases and Pests Detection product. 
//             Why AI?
//             Artificial intelligence system’s capacity to dynamically discern anomalous indicators in crops, 
//             such as separating pests from photographs of crops, is one of their benefits when used in agriculture. 
//             Utilizing conventional sensors to implement this feature is frequently difficult. 
//             When a sensor is utilized, it often needs to be set up in large quantities and well calibrated in order to produce a reliable value. 
//             This will make utilizing a sensor solution to find anomalies challenging and costly. 
//             When the user gathers crop anomalies to train the system, this is possible in a very flexible way thanks to artificial intelligence technology. 
//             The system was eventually able to pinpoint the majority of issues facing agricultural operations as the amount of data collected increased overtime. 
//             A sophisticated method for agriculture’s 4.0 technology is artificial intelligence.
//           </p>

//           <hr />

//           <p>
//           </p>

//           <p>Copyright by HCMUT.</p>
//         </div>


//     </Box>
//   );
// };

// export default About;


import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import WorkerCard from "../../components/WorkerCard/workercard";
import Avatar from 'react-avatar';

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const workers = [
    { name: "Nguyễn Phúc Tiến" },
    { name: "Võ Phan Anh Quân" },
    { name: "Võ Hùng" },
    { name: "Trần Công Minh Quân" },
  ];

  return (
    <Box m="20px">
      <Header title="About us" subtitle="Plant Diseases and Pests Detection" />
      <Box display="flex" alignItems="center" my="20px">
      <img src="https://www.ischool.berkeley.edu/sites/default/files/styles/facebook_image/public/sproject_teaser_image/reversed.jpg?itok=SuizhEmV" alt="Plant" width="500" height="220" />
        <Box ml="20px">
          <p style={{ fontSize: "20px", textAlign: "justify" }}>
            We are a team of passionate developers and researchers who have come
            together to build the Plant Diseases and Pests Detection product. Our
            aim is to make it easier for farmers and growers to identify and treat
            plant diseases and pests using artificial intelligence technology.
          </p>
        </Box>
      </Box>
      <hr />
      <Box mt="20px">

            <Typography variant="h3" color={colors.greenAccent[400]} fontWeight="bold">
                  Our team</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {workers.map((worker, index) => (
        <div key={index}>
          <h2>{worker.name}</h2>
          <Avatar name={worker.name} size="100" round={true} />
        </div>
      ))}
        </Box>
      </Box>
    </Box>
  );
};

export default About;
