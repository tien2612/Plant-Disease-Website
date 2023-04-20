import { useState } from "react";
import { Box, Button, Typography, IconButton, Collapse, Grid, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from '@material-ui/core/styles';
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: '90%',
    background: '#F0F0F0',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
}));

const ListItem = ( {date, items} ) => {
    const classes = useStyles();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const totalItems = Object.values(items).reduce((acc, curr) => acc + curr.length, 0);

    const totalCounts = {};
    for (const item of Object.keys(items)) {
      const totalCount = items[item].length;
      totalCounts[item] = totalCount ? totalCount : 0;
    }
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDetailsClick = () => {
        navigate("/images/box_images", {
            state: {
                date: date,
                items: items,
                totalCounts: totalCounts,
            }
        });
    }

  return (
        <Box className={classes.item} sx={{textAlign: 'center'}}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                className={classes.header}
            >
            <Typography variant="h5" sx={{justifyContent: 'center'}}>
            {formattedDate}
            </Typography>
            <IconButton onClick={handleExpandClick}>
            <ExpandMoreIcon />
            </IconButton>
        </Box>
        <Collapse in={expanded}>
        <Box className={classes.details}>
            <Grid container spacing={1} sx={{ width: "90%", textAlign: "left", margin: '7px'}}>
                <Grid item xs = {12}>
                    <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Detected / Total: </Box> 
                        {totalItems} / {totalItems}
                    </Typography>
                </Grid>

                <Grid item xs = {6}>
                    <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Healthy: </Box> 
                        {totalCounts['healthy'] ? totalCounts['healthy'] : 0}
                    </Typography>  
                </Grid>

                <Grid item xs = {6}>
                <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Complex: </Box> 
                        {totalCounts['complex'] ? totalCounts['complex'] : 0}
                    </Typography>    
                </Grid>

                <Grid item xs = {6}>
                <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Rust: </Box> 
                        {totalCounts['rust'] ? totalCounts['rust'] : 0}
                    </Typography>  
                </Grid>

                <Grid item xs = {6}>
                <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Scab: </Box> 
                        {totalCounts['scab'] ? totalCounts['scab'] : 0}
                    </Typography>    
                </Grid>

                <Grid item xs = {6}>
                <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Yellow: </Box> 
                        {totalCounts['yellow'] ? totalCounts['yellow'] : 0}
                    </Typography>   
                </Grid>

                <Grid item xs = {6}>
                <Typography variant="h5"> 
                        <Box component="span" fontWeight='bold' color={colors.greenAccent[400]}>Pests: </Box> 
                        {totalCounts['pests'] ? totalCounts['pests'] : 0}
                    </Typography>    
                </Grid>
                <Grid item xs = {12} sx={{textAlign: "right"}}>
                    <Button variant="contained" onClick={handleDetailsClick}>
                        Details
                    </Button>
                </Grid>
            </Grid>
        </Box>
        </Collapse>
        </Box>
  );
};

export default ListItem;
