import { ResponsiveLine } from "@nivo/line";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export const mockLineData = [
  {
    id: "temperature",
    color: tokens("dark").greenAccent[500],
    data: Array.from({ length: 10 }, () => ({
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    })),
  },
];

const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            // Convert time format to AM/PM or 24-hour format
            const time = value.split(":");
            let hour = parseInt(time[0]);
            const minutes = time[1];
            const seconds = time[2];
            const amPm = hour >= 12 ? "PM" : "AM";
            hour = hour % 12 || 12;
            const formattedTime = `${hour}:${minutes} ${amPm}`;
            // Return formatted time
            return formattedTime;
          },
        },
      },
    ],
  },
};

const LineChart = () => {
  const feedId = "tien2612";
  const feedKey = "aio_ifkz56vrwtMgVFn2F8njEoyP50fu";

  const [chartData, setChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hours = 1;
        const now = new Date();
        const startTime = new Date(now - hours * 60 * 60 * 1000).toISOString();

        const url = "https://io.adafruit.com/api/v2/tien2612/feeds/bbc-temp/data?start_time=${startTime}";

        const response = await fetch(url, {
          headers: {
            "X-AIO-Key": feedKey,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const chartData = {
          id: "Temperature",
          data: data.map((d) => ({
            x: new Date(d.created_at).toLocaleTimeString(),
            y: d.value,
          })),
        };
        setChartData([chartData]);
      } catch (error) {
        console.error("Error retrieving data from Adafruit:", error);
      }
    };

    fetchData();
  }, []);
  console.log(chartData);
  // return (
  //     // <Line
  //       // data={chartData}
  //       // options={{
  //       //   responsive: true,
  //       //   scales: {
  //       //     yAxes: [
  //       //       {
  //       //         ticks: {
  //       //           beginAtZero: true,
  //       //         },
  //       //       },
  //       //     ],
  //       //   },
  //       // }}
  // //     />
  // );
  console.log(options);
  return (
    <ResponsiveLine
      options={options}
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
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 0 ? undefined : "Time", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: 0 ? undefined : "count", // added
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
                itemBackground: "rgba(0, 0, 0, .03)",
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
