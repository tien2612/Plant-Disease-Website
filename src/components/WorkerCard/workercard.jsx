import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const WorkerCard = ({ name, image, position }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ maxWidth: 345, boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.1)" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {position}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
