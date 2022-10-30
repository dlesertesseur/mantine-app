import { Center } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import React from "react";
import About from "../Screens/About";
import Home from "../Screens/Home";

const CustomBody = () => {
  return (
    <Center>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Center>
  );
};

export default CustomBody;
