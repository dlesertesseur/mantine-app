import React, { useState } from "react";
import View2D from "../../../../Components/View2D";
import Toolbar from "./Toolbar";
import StaticLayout from "../Model/StaticLayout";
import { Group, Layer, Line } from "react-konva";
import { useSelector } from "react-redux";
import { Stack } from "@mantine/core";
import { saveLayout } from "../../../../DataAccess/Surfaces";
import { TOOLBAR_HIGHT } from "../../../../Constants";

const Editor = ({ floor, racks, layout, inspectRack, drawCenter = false, refresh }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);
  const [parts, setParts] = useState(layout.parts);
  const [savingData, setSavingData] = useState(false);

  const saveData = () => {
    setSavingData(true);
    layout.parts = parts;

    const params = {
      token: user.token,
      siteId: "fe742cc4-2bc0-4049-9a32-24cb01e74d26",
      floorId: "0f5bce2f-2b2f-4e73-9885-13080ed0b8f6",
      layoutId: "39c154df-7c92-4b6c-aa72-816e21dd7a45",
      layout: layout,
    };

    saveLayout(params).then(() => {
      setSavingData(false);
    });
  };

  const refreshData = () => {
    refresh();
  };

  const onOption = (option) => {
    if (option === "save") {
      saveData();
    }
    if (option === "refresh") {
      refreshData();
    }
  };

  return (
    <>
      <Stack
        justify="flex-start"
        spacing="0"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          height: "100%",
          border: "solid 1px" + theme.colors.gray[3],
        })}
      >
        <Toolbar onOption={onOption} />
        <View2D width={bodyContainerWidth} height={bodyContainerHeight - (TOOLBAR_HIGHT + 2)} working={savingData}>
          <Layer id="structure">
            {layout ? (
              <StaticLayout floor={floor} layout={layout} editingEnabled={true} parts={parts} setParts={setParts} />
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
