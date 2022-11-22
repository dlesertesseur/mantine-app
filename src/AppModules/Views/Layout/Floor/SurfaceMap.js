import React, { useState } from "react";
import View2D from "../.././../../Components/View2D";
import Zone from "../Model/Zone";
import RackLabel from "../Model/RackLabel";
import StaticLayout from "../Model/StaticLayout";
import Toolbar from "./Toolbar";
import { Group, Layer, Line } from "react-konva";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PIXEL_METER_RELATION, TOOLBAR_HIGHT } from "../../../../Constants";
import { Stack } from "@mantine/core";
import { findOperator } from ".././../../../DataAccess/Operators";
import { findLayoutByFloorId, findRacksByZoneId } from "../../../../DataAccess/Surfaces";
import { FilterControl } from "../Controls/FilterControl";

const SurfaceMap = ({ updateTime = 3000, editingEnabled = false, inspectRack, drawCenter = false }) => {
  const [anchorPointIndex, setAnchorPointIndex] = useState(0);
  const [operatorsStatus, setOperatorsStatus] = useState(false);
  const [selectedRack, setSelectedRack] = useState(null);
  const [momentum, setMomentum] = useState(1);
  const [operatorList, setOperatorList] = useState([]);
  const [maxAnchorPoints, setMaxAnchorPoints] = useState(0);
  const [rendering, setRedering] = useState(false);
  const [siteId, setSiteId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [floor, setFloor] = useState(null);
  const [layouts, setLayouts] = useState(null);
  const [racks, setRacks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pixelmeterrelation, setPixelmeterrelation] = useState(null);

  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);

  const zoneRef = useRef(null);
  useEffect(() => {
    const zone = zoneRef.current;
    if (zone.hasChildren()) {
      //zone.cache();
      console.log("CACHE LAYER");
    }
  }, [racks]);

  //DRAW OPERATORS STATUS
  useEffect(() => {
    if (operatorsStatus) {
      const timeToRefresh = 250;
      const timer = setTimeout(() => {
        if (anchorPointIndex < maxAnchorPoints) {
          setAnchorPointIndex(anchorPointIndex + 1);
          console.log("###     DRAW OPERATORS STATUS index: " + anchorPointIndex);
        } else {
          setRedering(false);
        }
      }, timeToRefresh);
      return () => clearTimeout(timer);
    }
  }, [anchorPointIndex, maxAnchorPoints, operatorsStatus]);

  //GET OPERARTOR STATUS
  useEffect(() => {
    if (!rendering && operatorsStatus) {
      const timer = setTimeout(() => {
        const params = {
          token: user.token,
          site: 999,
          momentum: momentum,
          operators: operatorList,
        };

        findOperator(params).then((response) => {
          let ret = 0;
          response.forEach((e) => {
            if (ret < e.anchorPoints?.length) {
              ret = e.anchorPoints?.length;
            }
          });

          console.log("### GET OPERARTOR STATUS steps: " + ret, response);

          setOperatorList(response);
          setMomentum(momentum + 1);
          setMaxAnchorPoints(ret);
          setAnchorPointIndex(0);
          if (ret > 0) {
            setRedering(true);
          }
        });
      }, updateTime);
      return () => clearTimeout(timer);
    }
  }, [momentum, operatorList, updateTime, user, rendering, operatorsStatus]);

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

  // const drawOperator = useCallback(
  //   (operator, structure) => {
  //     let posX = 0;
  //     let posY = 0;
  //     let visible = false;

  //     const n = (1.0 / structure.relacionPixelMetro) * PIXEL_METER_RELATION;

  //     if (operator.anchorPoints?.length > 0) {
  //       if (anchorPointIndex < operator.anchorPoints?.length) {
  //         const coord = operator.anchorPoints[anchorPointIndex];
  //         if (coord) {
  //           posX = coord.locationX * n;
  //           posY = coord.locationZ * n;
  //           visible = true;
  //         }
  //       } else {
  //         /*Toma la ultima posicion*/
  //         const coord = operator.anchorPoints[operator.anchorPoints?.length - 1];
  //         if (coord) {
  //           posX = coord.locationX * n;
  //           posY = coord.locationZ * n;
  //           visible = true;
  //         }
  //       }
  //     }
  //     return (
  //       <Operator
  //         key={operator.id}
  //         visible={visible}
  //         x={posX}
  //         y={posY}
  //         profile={operator.legajo}
  //         name={operator.name}
  //         status={operator.status}
  //         bgColor={operator.color}
  //       />
  //     );
  //   },
  //   [anchorPointIndex]
  // );

  const onOption = (option) => {
    if (option === "operatorsStatus") {
      setOperatorsStatus(true);
    } else {
      setOperatorsStatus(false);
    }
  };

  const loadData = (site, floor) => {
    const params = {
      token: user.token,
      siteId: site.id,
      floorId: floor.id,
    };

    const n = (1.0 / floor.pixelmeterrelation) * PIXEL_METER_RELATION;
    setPixelmeterrelation(n);

    setLoading(true);

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
      sx={(theme) => ({
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
      <View2D width={bodyContainerWidth} height={bodyContainerHeight - (TOOLBAR_HIGHT + 2)}>
        <Layer id="structure">
          {layouts && floor ? <StaticLayout pixelMeterRelation={pixelmeterrelation} layout={layouts[0]} parts={layouts[0]?.parts} /> : null}
        </Layer>
        <Layer id="zone" ref={zoneRef}>
          <Zone
            name={""}
            racks={racks}
            pixelMeterRelation={PIXEL_METER_RELATION}
            onRackClick={onRackClick}
            onRackDblClick={onRackDblClick}
            selectedRack={selectedRack}
            editingEnabled={editingEnabled}
          />
        </Layer>

        <Layer id="labels">
          {racks?.map((rack) => {
            const ret =
              rack.id === selectedRack?.id ? (
                <RackLabel
                  key={rack.id}
                  text={rack.name}
                  x={rack.positionx * PIXEL_METER_RELATION}
                  y={rack.positionz * PIXEL_METER_RELATION}
                />
              ) : null;

            return ret;
          })}
        </Layer>

        {drawCenter ? (
          <Layer id="centerPoint">
            <Group x={0} y={0}>
              <Line x={0} y={0} points={[-10, 0, 10, 0]} stroke="#ff0000" strokeWidth={0.5} />
              <Line x={0} y={0} points={[0, -10, 0, 10]} stroke="#ff0000" strokeWidth={0.5} />
            </Group>
          </Layer>
        ) : null}
      </View2D>
      {console.log("REPAINT ----> SurfaceMap " + Date.now())}
    </Stack>
  );
};

export default SurfaceMap;
