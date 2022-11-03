import SurfaceMap from "./SurfaceMap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { findFloor, findLayout, findRacksByZoneId } from "../../../../DataAccess/Surfaces.js";
import { Group, LoadingOverlay } from "@mantine/core";
import StorageStructureDialog from "../../../../Components/Dialogs/StorageStructureDialog";

const DynamicApp = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLayout, setLoadingLayout] = useState(true);
  const [racks, setRacks] = useState(null);
  const [rack, setRack] = useState(null);
  const [openPlanogram, setOpenPlanogram] = useState(false);
  const [layout, setLayout] = useState(null);
  const [floor, setFloor] = useState(null);

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
    });
  }, [user]);

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
        setLoadingLayout(false);
      });
    });
  }, [user]);

  const inspectRack = (rack) => {
    setRack(rack);
    setOpenPlanogram(true);
  };

  return (
    <Group >
      {loadingData && loadingLayout ? (
        <div style={{ width: 400, position: "relative" }}>
          <LoadingOverlay visible={loadingData && loadingLayout} overlayBlur={2} />
        </div>
      ) : (
        <SurfaceMap
          floor={floor}
          layout={layout}
          racks={racks}
          editingEnabled={false}
          inspectRack={inspectRack}
          drawCenter={true}
        />
      )}

      {openPlanogram && rack ? (
        <StorageStructureDialog open={openPlanogram} setOpen={setOpenPlanogram} storageStructure={rack} />
      ) : null}
    </Group>
  );
};

export default DynamicApp;
