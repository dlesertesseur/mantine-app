import React from "react";
import { Circle } from "react-konva";

const EditPoint = ({id, x, y, updateLocation, endDrag }) => {

  return (
    <Circle
      x={x}
      y={y}
      width={6}
      height={6}
      fill={"#ff0000"}
      draggable={true}
      onDragMove={(e) => {
        updateLocation(id, e.target.x(), e.target.y());
      }}

      onDragEnd={(e) => {
        endDrag();
      }}
    />
  );
};

export default EditPoint;
