import { API } from "../Constants";

const findAllRolesByUserId = async ({ siteId, userId, token }) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const url = API.auth.findAllRolesByUserId + siteId + "/" + userId;

    const res = await fetch(url, requestOptions);
    const data = await res.json();

    if (res.status !== 200) {
      throw Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

const findAllRolesInContext = async (params) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: params.token,
      },
    };

    const url = API.role.findAllRolesInContext + params.contextId;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    
    if (res.status !== 200) {
      throw Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export { findAllRolesByUserId, findAllRolesInContext };
