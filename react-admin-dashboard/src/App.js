import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Register from "./scenes/Auth/Register/Register";
import Login from "./scenes/Auth/Login/Login";
import Geography from "./scenes/geography";
import UploadFile from "./scenes/UploadFile/UploadFile"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [login, setLogin] = useState(false)
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {login&&<Sidebar isSidebar={isSidebar} />}
          <main className="content">
            { login&&<Topbar setIsSidebar={setIsSidebar} setLogin={setLogin}/>}
            <Routes>
              <Route path="/" element={<Login setLogin={setLogin}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/uploadfile" element={login?<UploadFile />:<Login setLogin={setLogin}/>} />
              <Route path="/dashboard" element={login?<Dashboard />:<Login setLogin={setLogin}/>} />
              <Route path="/team" element={login?<Team />:<Login setLogin={setLogin}/>} />
              <Route path="/logs" element={login?<Contacts />:<Login setLogin={setLogin}/>} />
              <Route path="/invoices" element={login?<Invoices />:<Login setLogin={setLogin}/>} />
              <Route path="/form" element={login?<Form />:<Login setLogin={setLogin}/>} />
              <Route path="/bar" element={login?<Bar />:<Login setLogin={setLogin}/>} />
              <Route path="/pie" element={login?<Pie />:<Login setLogin={setLogin}/>} />
              <Route path="/line" element={login?<Line />:<Login setLogin={setLogin}/>} />
              <Route path="/faq" element={login?<FAQ />:<Login setLogin={setLogin}/>} />
              <Route path="/calendar" element={login?<Calendar />:<Login setLogin={setLogin}/>} />
              <Route path="/geography" element={login?<Geography />:<Login setLogin={setLogin}/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
