import { useEffect } from "react";
import { useState } from "react";
import { Group, Line } from "react-konva";
import React from "react";
import EditPoint from "./EditPoint";

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
  selected,
  onSelect,
  onEdit,
}) => {
  const [pointList, setPointList] = useState([]);
  const [points, setPoints] = useState(geometry.points);

  useEffect(() => {
    const pp = [];
    if (points) {
      points.forEach((p) => {
        pp.push(p.positionx * pixelMeterRelation);
        pp.push(p.positiony * pixelMeterRelation);
      });
    }
    setPointList(pp);
  }, [pixelMeterRelation, points]);

  const updateLocation = (id, x, y) => {
    const ret = points.map((p) => {
      if (p.id === id) {
        p.positionx = x / pixelMeterRelation;
        p.positiony = y / pixelMeterRelation;
      }
      return p;
    });
    setPoints(ret);
  };

  const endDrag = () => {
    updatePart(partId, geometry);
  };

  return (
    <Group x={x} y={y} rotation={rotation} draggable>
      <Line
        name={name}
        points={pointList}
        stroke={selected ? "#ff0000" : borderColor}
        dash={selected ? [4, 2] : null}
        strokeWidth={selected ? 2 : 1}
        closed={true}
        fill={color ? color : "#0000ff"}
        onDblClick={() => {
          onEdit(partId);
        }}
        onMouseDown={() => {
          onSelect(partId);
        }}
      />
      {selected
        ? geometry.points.map((p) => (
            <EditPoint
              key={p.id}
              id={p.id}
              x={p.positionx * pixelMeterRelation}
              y={p.positiony * pixelMeterRelation}
              updateLocation={updateLocation}
              endDrag={endDrag}
            />
          ))
        : null}
    </Group>
  );
};

export default EditablePolygon;
