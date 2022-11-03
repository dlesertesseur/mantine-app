import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Zone from "../Model/Zone";
import StaticLayout from "../Model/StaticLayout";
import View2D from "../../../../Components/View2D";
import Footer from "./Footer";
import { Group, Layer, Line, Transformer } from "react-konva";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Drawer, Popover, Stack, TextInput } from "@mantine/core";
import { PIXEL_METER_RELATION, TOOLBAR_HIGHT } from "../../../../Constants";
import { savePosAndRots } from "../../../../DataAccess/Surfaces";

const Editor = ({ floor, layout, racks, inspectRack, drawCenter = false, refresh }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);
  const [parts] = useState(layout.parts);
  const [selectedRack, setSelectedRack] = useState(null);
  const [savingData, setSavingData] = useState(false);
  const [opened, setOpened] = useState(false);
  const [unlockEditStorageStructures, setUnlockEditStorageStructures] = useState(false);

  const trRef = useRef();

  const onRackDblClick = (ref, rack) => {
    inspectRack(selectedRack);
  };

  const onRackClick = (ref, rack) => {
    setSelectedRack(rack);
    const transformNode = trRef.current;
    transformNode.nodes([ref.current]);
  };

  const saveData = () => {
    setSavingData(true);

    const params = {
      token: user.token,
      racks: racks,
    };

    savePosAndRots(params).then(() => {
      setSavingData(false);
    });
  };

  const refreshData = () => {
    refresh();
  };

  const onOption = (option) => {
    console.log("onOption() ---> " + option);

    if (option === "save") {
      saveData();
    }
    if (option === "refresh") {
      refreshData();
    }

    if (option === "openDrawer") {
      setOpened(true);
    }
  };

  function handleTransform(e) {
    const obj = e.target;
    const transform = obj.getTransform().copy();
    const attrs = transform.decompose();

    if (selectedRack) {
      if (selectedRack !== null) {
        selectedRack.rotationy = -Math.round(attrs.rotation);
        selectedRack.positionx = attrs.x / PIXEL_METER_RELATION;
        selectedRack.positionz = attrs.y / PIXEL_METER_RELATION;
      }
    }
  }

  return (
    <>
      {/* <Popover width={300} opened={opened} trapFocus position="bottom" withArrow shadow="md">
        <Popover.Dropdown
          sx={(theme) => ({ background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white })}
        >
          <TextInput label="Name" placeholder="Name" size="xs" />
          <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
        </Popover.Dropdown>
      </Popover> */}

      <Stack
        justify="flex-start"
        spacing="0"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
          height: "100%",
          border: "solid 1px" + theme.colors.gray[4],
        })}
      >
        <Toolbar
          onOption={onOption}
          lockMove={unlockEditStorageStructures}
          setLockMove={setUnlockEditStorageStructures}
        />
        <View2D width={bodyContainerWidth} height={bodyContainerHeight - (TOOLBAR_HIGHT * 2 + 4)} working={savingData}>
          <Layer id="structure">{layout ? <StaticLayout floor={floor} layout={layout} parts={parts} /> : null}</Layer>
          <Layer id="zone">
            <Zone
              name={""}
              racks={racks}
              pixelMeterRelation={PIXEL_METER_RELATION}
              onRackClick={onRackClick}
              onRackDblClick={onRackDblClick}
              selectedRack={selectedRack}
              editingEnabled={unlockEditStorageStructures}
              showLabel={false}
            />

            <Transformer
              onTransform={handleTransform}
              onDragMove={handleTransform}
              rotateEnabled={unlockEditStorageStructures}
              resizeEnabled={false}
              ref={trRef}
            ></Transformer>
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
        <Footer seletedObject={selectedRack} />
        {console.log("REPAINT ----> Editor " + Date.now())}
      </Stack>
    </>
  );
};

export default Editor;
