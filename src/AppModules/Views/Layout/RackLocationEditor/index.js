import { useSelector } from "react-redux";
import { useEffect } from "react";
import { findFloor, findLayout, findRacksByZoneId } from "../../../../DataAccess/Surfaces";
import { useState } from "react";
import Editor from "./Editor";
import { Group, LoadingOverlay } from "@mantine/core";

const DynamicApp = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [loadingData, setLoadingData] = useState(true);
  const [racks, setRacks] = useState(null);
  const [rack, setRack] = useState(null);
  const [refreshData, setRefreshData] = useState(null);
  const [floor, setFloor] = useState(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const params = {
      token: user.token,
      siteId: "0f5bce2f-2b2f-4e73-9885-13080ed0b8f6",
      floorId: "0f5bce2f-2b2f-4e73-9885-13080ed0b8f6",
    };

    setLoadingData(true);
    findRacksByZoneId(params).then((ret) => {
      setLoadingData(false);
      setRacks(ret);

      console.log("####### LOADING DATA #######");
    });
  }, [user, refreshData]);

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
  }, [user]);

  const inspectRack = (rack) => {
    setRack(rack);
  };

  const refresh = () => {
    setRefreshData(Date.now());
    console.log("####### refresh #######");
  };

  return (
    <Group display={"flex"}>
      {loadingData ? (
        <div style={{ width: 400, position: "relative" }}>
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
    </Group>
  );
};

export default DynamicApp;
