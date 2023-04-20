import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Dashboard from "./scenes/dashboard";
import About from "./scenes/about";
import Images from "./scenes/images/images";
import ImageClassifier from "./components/Images/details";
import ListItem from "./components/Images/ListItem";
import AllBoxImages from "./components/Images";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/images" element={<Images />} />
              <Route path="/images/box_images/details" element={<ImageClassifier />} />
              <Route path="/list_item" element={<ListItem />} />
              <Route path="/images/box_images" element={<AllBoxImages />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
