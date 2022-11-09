import React, { useState } from "react";
import View2D from "../../../../Components/View2D";
import Toolbar from "./Toolbar";
import StaticLayout from "../Model/StaticLayout";
import { Group, Layer, Line } from "react-konva";
import { useSelector } from "react-redux";
import { Stack } from "@mantine/core";
import { findLayoutByFloorId, findRacksByZoneId, saveLayout } from "../../../../DataAccess/Surfaces";
import { TOOLBAR_HIGHT } from "../../../../Constants";
import { FilterControl } from "../Controls/FilterControl";

const Editor = ({ inspectRack, drawCenter = false }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);

  const [parts, setParts] = useState([]);
  const [savingData, setSavingData] = useState(false);
  const [siteId, setSiteId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [layout, setLayout] = useState(null);
//  const [setRacks] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveData = () => {
    setSavingData(true);
    layout.parts = parts;
    const params = {
      token: user.token,
      siteId: siteId,
      floorId: floorId,
      layoutId: layout.id,
      layout: layout,
    };
    saveLayout(params).then(() => {
      setSavingData(false);
    });
  };

  const onOption = (option) => {
    if (option === "save") {
      saveData();
    }
    if (option === "refresh") {
    }
  };

  const loadData = (site, floor) => {
    const params = {
      token: user.token,
      siteId: site.id,
      floorId: floor.id,
    };

    setLoading(true);

    findLayoutByFloorId(params).then((ret) => {
      setLayout(ret[0]);
      setParts(ret[0].parts);

      findRacksByZoneId(params).then((ret) => {
        //setRacks(ret);
        setLoading(false);
      });
    });
  };

  return (
    <>
      <Stack
        justify="flex-start"
        spacing="0"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
          height: "100%",
          border: "solid 1px" + theme.colors.gray[4],
        })}
      >
        <Toolbar onOption={onOption}>
          <FilterControl
            siteId={siteId}
            setSiteId={setSiteId}
            floorId={floorId}
            setFloorId={setFloorId}
            onFilter={loadData}
            loading={loading}
            setFloor={setFloor}
          />
        </Toolbar>

        <View2D width={bodyContainerWidth} height={bodyContainerHeight - (TOOLBAR_HIGHT + 2)} working={savingData}>
          <Layer id="structure">
            {layout && floor ? (
              <StaticLayout floor={floor} editingEnabled={true} layout={layout} setParts={setParts} parts={parts} />
            ) : null}
          </Layer>

          {drawCenter ? (
            <Layer id="centerPoint">
              <Group x={0} y={0}>
                <Line x={0} y={0} points={[-10, 0, 10, 0]} stroke="#ff0000" strokeWidth={0.3} />
                <Line x={0} y={0} points={[0, -10, 0, 10]} stroke="#ff0000" strokeWidth={0.3} />
              </Group>
            </Layer>
          ) : null}
        </View2D>
        {console.log("REPAINT ----> Editor " + Date.now())}
      </Stack>
    </>
  );
};

export default Editor;
