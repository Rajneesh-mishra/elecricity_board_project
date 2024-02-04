import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import api from "../../services/apiService";


const Home = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLines, setChartLines] = useState('all');
  
  const fetchConnections = async () => {
    try {
      const response = await api.get("/electricity-connection/");
      const transformedData = chartDataTransformer(response.data);
      setChartData(transformedData);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
    }
  };
  const chartDataTransformer = (connections) => {
    const data = Object.groupBy(connections, ({ date_of_application }) =>
      new Date(date_of_application).toLocaleString("en-In", { month: "short" })
    );
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let transformedData = [];

    for (const [month, connectionsInMonth] of Object.entries(data)) {
      const chartData = {};
      chartData.Month = month;
      chartData.All = connectionsInMonth.length;
      chartData.Approved = connectionsInMonth.filter(
        (connection) => connection.status === "Approved"
      ).length;
      chartData["Released"] = connectionsInMonth.filter(
        (connection) => connection.status === "Connection Released"
      ).length;
      chartData["Pending"] = connectionsInMonth.filter(
        (connection) => connection.status === "Pending"
      ).length;
      transformedData.push(chartData);
    }
    transformedData = transformedData.sort(
      (chartData1, chartData2) =>
        monthAbbreviations.indexOf(chartData1.Month) -
        monthAbbreviations.indexOf(chartData2.Month)
    );
    return transformedData;
  };

  const handleStatusChange = (event)=>{
    const {value} = event.target
    setChartLines(value);
  }
  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box padding="20px">
      <Paper>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" margin={4} gutterBottom fontWeight={500}>
            Electricity Connections Statistics
          </Typography>
          <Box margin={4} width={300}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter by Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Filter by Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'approved'}>Approved</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'released'}>Released</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height={500}>

        <LineChart
          width='100%'
        //   height={500}
          data={chartData}
          margin={{
            top: 50,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
        { chartLines ==="all"&&  <Line
            type="monotone"
            dataKey="All"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />}
         {(chartLines ==="all" || chartLines ==="approved") && <Line type="monotone" dataKey="Approved" stroke="#82ca9d" />}
          {(chartLines ==="all" || chartLines ==="pending") && <Line type="monotone" dataKey="Pending" stroke="#ca8282" />}
          {(chartLines ==="all" || chartLines ==="released") && <Line type="monotone" dataKey="Released" stroke="#8488ca" />}
        </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Home;
