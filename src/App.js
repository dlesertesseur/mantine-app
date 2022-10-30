import "./App.css";
import CustomAppShell from "./Components/CustomAppShell";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./Screens/SignIn";
import { SignUp } from "./Screens/SignUp";
import { ProtectedRoute } from "./Components/ProtectedRoute";


function App() {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <ProtectedRoute>
              <Route exact path="/menu/*" element={<CustomAppShell />} />
            </ProtectedRoute>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
