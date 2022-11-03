import { useSelector } from "react-redux";
import { useEffect } from "react";
import { findFloor, findLayout } from "../../../../DataAccess/Surfaces";
import { useState } from "react";
import { Container, Group, LoadingOverlay } from "@mantine/core";
import Editor from "./Editor";

const DynamicApp = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [loadingData, setLoadingData] = useState(true);
  const [racks, setRacks] = useState(null);
  const [rack, setRack] = useState(null);
  const [refreshData, setRefreshData] = useState(null);
  const [layout, setLayout] = useState(null);
  const [floor, setFloor] = useState(null);

  useEffect(() => {
    const params = {
      token: user.token,
      siteId: "fe742cc4-2bc0-4049-9a32-24cb01e74d26",
      floorId: "0f5bce2f-2b2f-4e73-9885-13080ed0b8f6",
      layoutId: "39c154df-7c92-4b6c-aa72-816e21dd7a45",
    };

    findFloor(params).then((floor) => {
      setFloor(floor);

      findLayout(params).then((ret) => {
        setLayout(ret);
        setLoadingData(false);
      });
    });
  }, [user, refreshData]);

  const inspectRack = (rack) => {
    setRack(rack);
  };

  const refresh = () => {
    console.log("####### refresh #######");
    setRefreshData(Date.now());
  };

  return (
    <>
      {loadingData ? (
        <div style={{ width:"100%", height:"100%", position: "relative" }}>
          <LoadingOverlay visible={loadingData} overlayBlur={2} />
        </div>
      ) : (
        <Editor
          racks={racks}
          floor={floor}
          layout={layout}
          inspectRack={inspectRack}
          drawCenter={false}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default DynamicApp;
