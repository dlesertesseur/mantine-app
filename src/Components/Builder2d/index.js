import Konva from "konva";
import { PIXEL_METER_RELATION } from "../../Constants";
import { getModulePartColor, getModulePartStrokeColor } from "../../Util";

function buildPolygon(pixelMeterRelation, geometry, fill, stroke) {
  let polygon = null;
  let points = geometry.points;
  let pp = [];

  if (points) {
    points.forEach((p) => {
      pp.push(p.positionx * pixelMeterRelation);
      pp.push(p.positiony * pixelMeterRelation);
    });
  }

  polygon = new Konva.Line({ points: pp, stroke: stroke, fill: fill, strokeWidth: 1, closed: true });
  return polygon;
}

function bulidPart(pixelMeterRelation, part) {
  let grPart = null;
  let polygon = null;

  grPart = new Konva.Group({
    id: part.id,
    x: part.positionx * PIXEL_METER_RELATION,
    y: part.positionz * PIXEL_METER_RELATION,
    rotation: part.rotationy,
    name: part.name,
  });
  polygon = buildPolygon(pixelMeterRelation, part.geometries[0], part.color, part.borderColor);

  grPart.add(polygon);
  return grPart;
}

function buildLayout(stageRef, pixelMeterRelation, layout, cache = false) {
  let part;
  const parts = layout.parts;
  const layer = new Konva.Layer({ id: layout.id });

  for (let index = 0; index < parts.length; index++) {
    part = bulidPart(pixelMeterRelation, parts[index]);
    layer.add(part);
  }

  if(cache){
    layer.cache();
  }

  stageRef.add(layer);
}

function buildModulePart(modulePart) {
  let grPart = null;

  grPart = new Konva.Rect({
    id: modulePart.id,
    x: (modulePart.positionx - modulePart.dimensionx / 2.0) * PIXEL_METER_RELATION,
    y: (modulePart.positionz - modulePart.dimensionz / 2.0) * PIXEL_METER_RELATION,
    width: modulePart.dimensionx * PIXEL_METER_RELATION,
    height: modulePart.dimensionz * PIXEL_METER_RELATION,
    rotation: modulePart.rotationy,
    name: modulePart.name,
    stroke: getModulePartStrokeColor(modulePart.type),
    fill: getModulePartColor(modulePart.type),
  });

  return grPart;
}

function buildModule(grModule, parts) {
  let grPart = null;
  for (let index = 0; index < parts.length; index++) {
    grPart = buildModulePart(parts[index]);
    grModule.add(grPart);
  }
}

function buildActorModules(grActor, modules) {
  let module = null;
  let grModule = null;

  for (let index = 0; index < modules.length; index++) {
    module = modules[index];

    grModule = new Konva.Group({
      x: module.positionx * PIXEL_METER_RELATION,
      y: module.positionz * PIXEL_METER_RELATION,
      name: module.name,
      width: module.dimensionx * PIXEL_METER_RELATION,
      height: module.dimensionz * PIXEL_METER_RELATION,
      rotation: -module.rotationy,
    });

    buildModule(grModule, module.parts);

    grActor.add(grModule);
  }
}

function buildActorFrames(grActor, frames) {
  let frame = null;
  let grFrame = null;

  for (let index = 0; index < frames.length; index++) {
    frame = frames[index];

    grFrame = new Konva.Rect({
        id: frame.id,
        x: (frame.positionx - frame.dimensionx / 2.0) * PIXEL_METER_RELATION,
        y: (frame.positionz - frame.dimensionz / 2.0) * PIXEL_METER_RELATION,
        width: frame.dimensionx * PIXEL_METER_RELATION,
        height: frame.dimensionz * PIXEL_METER_RELATION,
        rotation: frame.rotationy,
        name: frame.name,
        stroke: getModulePartStrokeColor(frame.type),
        fill: getModulePartColor(frame.type),
        strokeWidth:0.2
      });

    grActor.add(grFrame);
  }
}

function buildActor(pixelMeterRelation, actor) {
  let grActor = null;

  grActor = new Konva.Group({
    id: actor.id,
    x: actor.positionx * pixelMeterRelation,
    y: actor.positionz * pixelMeterRelation,
    name: actor.name,
    width: actor.dimensionx * pixelMeterRelation,
    height: actor.dimensionz * pixelMeterRelation,
    rotation: -actor.rotationy,
  });

  buildActorModules(grActor, actor.modules);
  buildActorFrames(grActor, actor.frames);

  return grActor;
}

function buildActors(stageRef, actors, cache = false) {
  let actor;
  const layer = new Konva.Layer({ id: "actors" });

  for (let index = 0; index < actors.length; index++) {
    actor = buildActor(PIXEL_METER_RELATION, actors[index]);
    layer.add(actor);
  }

  if(cache){
    layer.cache({pixelRatio:3});
  }
  stageRef.add(layer);
}
export { buildLayout, buildActors };
