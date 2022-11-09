import React, { useEffect, useState } from "react";
import StructurePart from "./StructurePart";
import { Circle, Group } from "react-konva";
import { PIXEL_METER_RELATION } from "../../../../Constants";

const StaticLayout = ({ floor, layout, center = false, editingEnabled = false, parts, setParts}) => {
  const [pixelMeterRelation, setPixelMeterRelation] = useState(null);
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [setEditingPartId] = useState(null);

  useEffect(() => {
    const n = (1.0 / floor?.pixelmeterrelation) * PIXEL_METER_RELATION;
    setPixelMeterRelation(n);

  }, [floor]);

  const updatePart = (partId, geometry) => {
    const ret = parts?.map((p) => {
      if (p.id === partId) {
        p.geometry = geometry;
      }
      return p;
    });
    
    setParts(ret);
  };

  return (
    <Group rotation={layout.rotation} name={layout.name} draggable={editingEnabled}>
      {parts?.map((part) => {
        return (
          <StructurePart
            key={part.id}
            partId={part.id}
            x={part.positionx * PIXEL_METER_RELATION}
            y={part.positionz * PIXEL_METER_RELATION}
            rotation={part.rotationy}
            width={part.dimensionx}
            height={part.dimensionz}
            color={part.color}
            borderColor={part.borderColor}
            geometry={part.geometries[0]}
            type={part.primitivetype}
            pixelMeterRelation={pixelMeterRelation}
            name={layout.name}
            editingEnabled={editingEnabled}
            updatePart={updatePart}
            selected={part.id === selectedPartId}
            onSelect={(id) => setSelectedPartId(id)}
            onEdit={(id) => setEditingPartId(id)}
          />
        );
      })}

      {center ? <Circle width={2} height={2} fill={"#ff0000"} /> : null}
    </Group>
  );
};

export default StaticLayout;
