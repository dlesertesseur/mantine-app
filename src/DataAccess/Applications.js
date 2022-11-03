import { API } from "../Constants";

async function findAllApplicationsByRoleId(params, setData) {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };

    const res = await fetch(API.role.findAllApplicationsByRole + params.roleId, requestOptions);
    const data = await res.json();
    setData(data);
    return data;
  } catch (error) {
    return error;
  }
}

export { findAllApplicationsByRoleId};
