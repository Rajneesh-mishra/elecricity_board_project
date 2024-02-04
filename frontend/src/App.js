import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme,lightTheme} from "./theme";
import Layout from "./components/Layout";
import { useState } from "react";


function App() {
  const [currentTheme,setCurrentTheme] = useState('light')
  return (
      <Router>
      <ThemeProvider theme={currentTheme==='dark'?darkTheme:lightTheme}>
        <Layout setCurrentTheme={setCurrentTheme} currentTheme={currentTheme}>
        <Routes/>
        </Layout>
        </ThemeProvider>
      </Router>
  );
}

export default App;
