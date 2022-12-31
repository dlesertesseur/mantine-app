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


const findAllRoles = async ({ siteId, userId, token }) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const url = API.role.findAll;

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

async function createRole(parameters) {
  try {
    const body = JSON.stringify({
      name: parameters.data.name,
      description: parameters.data.description,
    });

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
      body: body,
    };

    const url = API.role.create;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function updateRole(parameters) {
  try {
    const body = JSON.stringify({
      id: parameters.data.id,
      name: parameters.data.name,
      description: parameters.data.description,
    });

    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type":"application/json",
        token: parameters.token,
      },
      body: body,
    };

    console.log("updateOrganization requestOptions -> ", requestOptions);

    const res = await fetch(API.role.update, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function deleteRole(parameters) {
  try {
    const body = JSON.stringify({
      id: parameters.id,
    });

    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
      body: body,
    };

    await fetch(API.role.delete + parameters.id, requestOptions).then((response) => {
      return response;
    });
  } catch (error) {
    return error;
  }
}


export { createRole, updateRole, deleteRole, findAllRolesByUserId, findAllRolesInContext, findAllRoles };
