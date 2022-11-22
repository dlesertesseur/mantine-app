import React from "react";
import { Circle } from "react-konva";

const EditPoint = ({id, x, y, updateLocation, endDrag, selected, setSelected }) => {

  const localSelection = (e) => {
    setSelected(id);
  }
  
  return (
    <Circle
      id={id}
      x={x}
      y={y}
      width={6}
      height={6}
      fill={selected ? "#ff0000" : "#0000ff"}
      draggable={true}
      onDragMove={(e) => {
        updateLocation(id, e.target.x(), e.target.y());
      }}
      onMouseDown={(e) => localSelection(e)}
      onTap={(e) => localSelection(e)}
    />
  );
};

export default EditPoint;
