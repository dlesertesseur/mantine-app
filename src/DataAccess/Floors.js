import { API } from "../Constants";

const findFloorsBySiteId = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };
    const url = API.floor.findAll + "/" + parameters.siteId;

    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export { findFloorsBySiteId };
