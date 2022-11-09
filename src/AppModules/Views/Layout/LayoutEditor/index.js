import Editor from "./Editor";

const DynamicApp = () => {
  
  const inspectRack = (rack) => {
    // setRack(rack);
  };

  return (
    <Editor
      inspectRack={inspectRack}
      drawCenter={false}
    />
  );
};

export default DynamicApp;
