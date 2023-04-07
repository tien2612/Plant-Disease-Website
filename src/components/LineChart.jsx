import { ResponsiveLine } from "@nivo/line";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ index, selectedDate }) => {
  const feedIds = ["Temperature", "Humidity", "Soil Moisture"];
  const feedKey = "aio_yFLR93oAwRxwn3IP99rQkih9MJ37";

  const [chartData, setChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const formatDate = (date) => {
  //   if (!date) {
  //     return null;
  //   }
  //   const parts = date.toISOString().slice(0, 10).split('-');
  //   return `${parts[0]}-${parts[1]}-${parseInt(parts[2])}`;
  // };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const formattedDate = formatDate(selectedDate);

  console.log(formattedDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hours = 168;
        const now = new Date();
        const startTime = new Date(now - hours * 60 * 60 * 1000).toISOString();

        // const url = "https://io.adafruit.com/api/v2/tien2612/feeds/bbc-temp/data?start_time=${startTime}";
        const url = [
          `https://io.adafruit.com/api/v2/tien2612/feeds/bbc-temp/data?start_time=${startTime}`,
          `https://io.adafruit.com/api/v2/tien2612/feeds/bbc-humi/data?start_time=${startTime}`,
          `https://io.adafruit.com/api/v2/tien2612/feeds/bbc-shumi/data?start_time=${startTime}`,
        ];

        const response = await fetch(url[index], {
          headers: {
            "X-AIO-Key": feedKey,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        /* Group data */
        const groupedData = data.reduce((acc, obj) => {
          const date = obj.created_at.slice(0, 10); // extract the date from the timestamp
          if (!acc[date]) {
            acc[date] = [obj];
          } else {
            acc[date].push(obj);
          }
          return acc;
        }, {});
        
        // console.log(groupedData);

        const dataByDate = groupedData[formattedDate];

        console.log(dataByDate);
        if (dataByDate) {
          const chartData = {
            id: feedIds[index],
            // color: colors[index % colors.length],
            data: dataByDate.map((d) => ({
              x: new Date(d.created_at).toLocaleTimeString(),
              y: d.value,
            })),
          };

          chartData.data.reverse();
          setChartData([chartData]);
        } else {
          setChartData([]);
          console.log(`empty`);
        }
      
      } catch (error) {
        console.error("Error retrieving data from Adafruit:", error);
      }
    };

    fetchData();
    console.log(chartData);
  }, [index, selectedDate]);

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        }, 
      }}
      colors={0 ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: [],
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 0 ? undefined : formattedDate,
        legendOffset: 36,
        legendPosition: "middle",
        tickFormat: () => '',
      }}      
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: 0 ? undefined : "Value", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(255, 255, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
// };

export default LineChart;