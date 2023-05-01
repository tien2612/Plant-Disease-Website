import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
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
      <img src="/assets/plant.jpg" alt="Plant" width="500" height="220" />
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
