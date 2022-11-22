import uuid from "react-uuid";

function findTraduction(locale, field, translations) {
  let value = null;

  if (translations !== null && translations !== undefined) {
    const translate = translations?.find((t) => t.locale === locale);

    if (translate !== null && translate !== undefined) {
      if (field in translate) {
        value = translate[field];
      }
    }
  }
  return value;
}

function findTranslatedField(locale, obj, field) {
  let value = null;

  if (obj !== null && obj?.translations != null) {
    value = findTraduction(locale, field, obj?.translations);
  }
  return value !== null ? value : obj[field];
}

function getFillColor(type) {
  let color;

  switch (type) {
    case 1:
      //color = "#b3ecff";
      color = "#e5e5e5";
      break;
    case 2:
      color = "#1a66ff";
      break;
    case 3:
      color = "#a3c2c2";
      break;

    default:
      color = "#e5e5e5";
      break;
  }
  return color;
}

function getStrokeColor(type) {
  let color;

  switch (type) {
    case 1:
      //color = "#80dfff";
      color = "#e5e5e5";
      break;
    case 2:
      color = "#004de6";
      break;
    case 3:
      color = "#85adad";
      break;

    default:
      color = "#e5e5e5";
      break;
  }

  return color;
}

function getModulePartColor(type) {
  let color;

  switch (type) {
    case 1:
      color = "#468faf";
      break;
    case 2:
      color = "#d3d3d3";
      break;
    case 3:
      color = "#468faf";
      break;
    case 4:
      color = "#468faf";
      break;
    case 5:
      color = "#F8F9D7";
      break;

    default:
      color = "#ff00ff";
      break;
  }

  return color;
}

function getModulePartStrokeColor(type) {
  let color;

  switch (type) {
    case 1:
      color = "#468faf";
      break;
    case 2:
      color = "#d3d3d3";
      break;
    case 3:
      color = "#468faf";
      break;
    case 4:
      color = "#468faf";
      break;
    case 5:
      color = "#F8F9D7";
      break;

    default:
      color = "#ff00ff";
      break;
  }

  return color;
}

function getModulePartSelectedColor(type) {
  let color;

  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      color = "#ff0000";
      break;

    default:
      color = "#ff0000";
      break;
  }

  return color;
}

function getRackSelectedColor() {
  const color = "#ff0000";
  return color;
}

function getPartSelectedColor() {
  const color = "#ff0000";
  return color;
}

const createPartTemplate = () => {
  const part = {
    id: uuid(),
    name: "NEW PART",
    primitivetype: 100,
    positionx: 0,
    positiony: 0,
    positionz: 0,
    color: "#9C99A6",
    timestamp: null,
    borderColor: "#8C99A6",
    geometries: [
      {
        id: uuid(),
        name: "NEW GEOMETRY",
        type: "polygon",
        timestamp: null,
        pixelmeterrelation: null,
        thickness: 2,
        path: "",
        points: [
          {
            id: uuid(),
            positionx: 0,
            positiony: 0,
            positionz: 0,
            ordernumber: 0,
            texturated: null,
            timestamp: null,
          },
        ],
      },
    ],
  };
  return part;
};

export {
  findTranslatedField,
  getFillColor,
  getStrokeColor,
  getModulePartColor,
  getModulePartStrokeColor,
  getModulePartSelectedColor,
  getRackSelectedColor,
  getPartSelectedColor,
  createPartTemplate,
};
