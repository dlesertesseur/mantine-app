import React from "react";
import EditPoint from "./EditPoint";
import { useRef } from "react";
import { Group, Line } from "react-konva";
import { PIXEL_METER_RELATION } from "../../../../Constants";

const EditablePolygon = ({
  x,
  y,
  geometry,
  color,
  borderColor,
  pixelMeterRelation,
  rotation,
  name = "no-def",
  partId,
  updatePart,
  updatePartLocation,
  selected = false,
  editing = false,
  editPointSelected,
  setEditPointSelected,
}) => {
  const polygonRef = useRef();

  const updateLocation = (id, x, y) => {
    const points = geometry.points;
    points.forEach((p) => {
      if (p.id === id) {
        p.positionx = x / pixelMeterRelation;
        p.positiony = y / pixelMeterRelation;
      }
    });

    updatePart(partId, geometry);
  };

  const drawEditing = () => {
    const points = geometry.points;
    const ret = points.map((p) => (
      <EditPoint
        key={p.id}
        id={p.id}
        x={p.positionx * pixelMeterRelation}
        y={p.positiony * pixelMeterRelation}
        updateLocation={updateLocation}
        selected={p.id === editPointSelected}
        setSelected={setEditPointSelected} 
      />
    ));

    return ret;
  };

  const drawPolygon = () => {
    const pointList = [];
    const points = geometry.points;

    if (points) {
      points.forEach((p) => {
        pointList.push(p.positionx * pixelMeterRelation);
        pointList.push(p.positiony * pixelMeterRelation);
      });
    }

    const colorLine = editing ? "#0000ff" : "#ff0000";

    const line = (
      <Line
        ref={polygonRef}
        name={name}
        points={pointList}
        stroke={selected ? colorLine : borderColor}
        strokeWidth={selected ? 2 : 1}
        closed={true}
        fill={color ? color : "#0000ff"}
      />
    );
    return line;
  };

  const onDragEnd = (e) => {
    const attrs = e.target.attrs;
    if (attrs.id === partId) {
      const location = { x: attrs.x / PIXEL_METER_RELATION, y: attrs.y / PIXEL_METER_RELATION };
      updatePartLocation(partId, location);
    }
  };

  return (
    <Group id={partId} x={x} y={y} rotation={rotation} draggable={editing} onDragEnd={onDragEnd}>
      {drawPolygon()}
      {editing ? drawEditing() : null}
    </Group>
  );
};

export default EditablePolygon;
