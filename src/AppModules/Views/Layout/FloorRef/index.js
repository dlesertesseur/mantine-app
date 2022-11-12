import Viewer from "./Viewer";
import { useState } from "react";

const DynamicApp = () => {
  const [rack, setRack] = useState(null);

  const inspectRack = (rack) => {
    setRack(rack);
  };

  return <Viewer inspectRack={inspectRack} drawCenter={true} />;
};

export default DynamicApp;
