import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Zone from "../Model/Zone";
import StaticLayout from "../Model/StaticLayout";
import View2D from "../../../../Components/View2D";
import Footer from "./Footer";
import { Group, Layer, Line, Transformer } from "react-konva";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mantine/core";
import { PIXEL_METER_RELATION, TOOLBAR_HIGHT } from "../../../../Constants";
import { savePosAndRots } from "../../../../DataAccess/Surfaces";
import { FilterControl } from "../Controls/FilterControl";
import { findLayoutByFloorId, findRacksByZoneId } from "../../../../DataAccess/Surfaces";

const Editor = ({ inspectRack, drawCenter = false, refresh }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);
  const [selectedRack, setSelectedRack] = useState(null);
  const [savingData, setSavingData] = useState(false);
  const [unlockEditStorageStructures, setUnlockEditStorageStructures] = useState(false);
  const [siteId, setSiteId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [layout, setLayout] = useState(null);
  const [racks, setRacks] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const loadData = (site, floor) => {
    const params = {
      token: user.token,
      siteId: site.id,
      floorId: floor.id,
    };

    setLoading(true);

    findLayoutByFloorId(params).then((ret) => {
      setLayout(ret[0]);
      findRacksByZoneId(params).then((ret) => {
        setRacks(ret);
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
        <Toolbar
          onOption={onOption}
          lockMove={unlockEditStorageStructures}
          setLockMove={setUnlockEditStorageStructures}
        >
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

        <View2D width={bodyContainerWidth} height={bodyContainerHeight - (TOOLBAR_HIGHT * 2 + 4)} working={savingData}>
          <Layer id="structure">
            {layout ? <StaticLayout floor={floor} layout={layout} parts={layout.parts} /> : null}
          </Layer>
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
              detailContent={false}
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
