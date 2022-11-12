import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { PIXEL_METER_RELATION, TOOLBAR_HIGHT } from "../../../../Constants";
import { Stack } from "@mantine/core";
import { findLayoutByFloorId, findRacksByZoneId } from "../../../../DataAccess/Surfaces";
import { FilterControl } from "../Controls/FilterControl";
import View2DRef from "../../../../Components/View2dRef";

const Viewer = ({ updateTime = 3000, editingEnabled = false, inspectRack, drawCenter = false }) => {
  const [selectedRack, setSelectedRack] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [layouts, setLayouts] = useState(null);
  const [racks, setRacks] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);
  const [pixelmeterrelation, setPixelmeterrelation] = useState(null);

  const onRackDblClick = (ref, rack) => {
    inspectRack(selectedRack);
  };

  const onRackClick = (ref, rack) => {
    setSelectedRack(rack);

    if (editingEnabled) {
      const transformNode = trRef.current;
      transformNode.nodes([ref.current]);
    }
  };

  const onOption = (option) => {
    if (option === "operatorsStatus") {
      //   setOperatorsStatus(true);
      // } else {
      //   setOperatorsStatus(false);
    }
  };

  const loadData = (site, floor) => {
    const params = {
      token: user.token,
      siteId: site.id,
      floorId: floor.id,
    };

    setLoading(true);

    const n = (1.0 / floor.pixelmeterrelation) * PIXEL_METER_RELATION;
    setPixelmeterrelation(n);

    findLayoutByFloorId(params).then((ret) => {
      setLayouts(ret);
      findRacksByZoneId(params).then((ret) => {
        setRacks(ret);
        setLoading(false);
      });
    });
  };

  const trRef = useRef();

  return (
    <Stack
      justify="flex-start"
      spacing="0"
      sx={(theme, bodyContainerWidth) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
        height: "100%",
        border: "solid 1px" + theme.colors.gray[3],
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

      <View2DRef
        width={bodyContainerWidth}
        height={bodyContainerHeight - (TOOLBAR_HIGHT + 2)}
        layouts={layouts}
        pixelMeterRelation={pixelmeterrelation}
        racks={racks}
      />

      {console.log("REPAINT ----> Viewer " + Date.now())}
    </Stack>
  );
};

export default Viewer;
