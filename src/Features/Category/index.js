import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Constants";

const initialState = {
  value: {
    loadingCategories: false,
    error: "",
    categoriesRoot: null,
    categoriesChild: [],
    categories: [],
    finalCategories: null,
    path: [],
    selectedRowId: null,
    refreshData: null,
    activePage: null,
  },
};

export const insertCategory = createAsyncThunk("category/insertCategory", async (parameters, asyncThunk) => {
  try {
    const body = JSON.stringify({
      name: parameters.name,
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

    const url = API.category.create + parameters.parentId;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return asyncThunk.rejectWithValue(error);
  }
});

export const removeCategory = createAsyncThunk("category/removeCategory", async (parameters, asyncThunk) => {
  try {
    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };

    await fetch(API.category.delete + parameters.id, requestOptions).then((response) => {
      return response;
    });
  } catch (error) {
    return asyncThunk.rejectWithValue(error);
  }
});

export const updateCategory = createAsyncThunk("category/updateCategory", async (parameters, asyncThunk) => {
  try {
    const body = JSON.stringify({
      id: parameters.id,
      name: parameters.name,
    });

    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
      body: body,
    };

    const res = await fetch(API.category.update, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return asyncThunk.rejectWithValue(error);
  }
});

export const getRootOfCategories = createAsyncThunk("category/getRootOfCategories", async (parameters, asyncThunk) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json", token: parameters.token },
    };

    const url = API.category.getRootOfCategories;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return asyncThunk.rejectWithValue(error);
  }
});

export const getAllCategories = createAsyncThunk("category/getAllCategories", async (parameters, asyncThunk) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json", token: parameters.token },
    };

    const url = API.category.getAllCategories;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return asyncThunk.rejectWithValue(error);
  }
});

export const getChildrenOfCategory = createAsyncThunk(
  "category/getChildrenOfCategory",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json", token: parameters.token },
      };

      const url = API.category.getChildrenOfCategory + parameters.nodeId;
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return asyncThunk.rejectWithValue(error);
    }
  }
);

function findLeafCategories(set, nodes) {
  if (nodes.children.length === 0) {
    set.push(nodes.id);
  }

  for (const child of nodes.children) {
    findLeafCategories(set, child);
  }
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedRowId: (state, { payload }) => {
      state.value.selectedRowId = payload;
    },

    refreshDataGrid: (state) => {
      state.value.refreshData = Date.now();
    },

    setCategoryRoot: (state, { payload }) => {
      state.value.categoriesRoot = payload;
      state.value.selectedRow = null;
    },

    addToPath: (state, { payload }) => {
      state.value.path.push(payload);
    },

    getAndRemoveLastItemFromPath: (state) => {
      state.value.path.splice(-1);
      const last = state.value.path[state.value.path.length - 1];
      state.value.categoriesRoot = last;
      state.value.selectedRow = null;
    },

    calculateFinalCategries: (state) => {
      const set = [];
      findLeafCategories(set, state.value.categories);
      state.value.finalCategories = set;
    },

    setActivePage: (state, { payload }) => {
      state.value.activePage = payload;
    },
  },
  extraReducers: {
    /*CREATE*/
    [insertCategory.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
    },

    [insertCategory.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload;
      } else {
        state.value.error = null;
        state.value.refreshData = Date.now();
      }
      state.value.loadingCategories = false;
    },

    [insertCategory.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },

    /*DELETE*/
    [removeCategory.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
    },

    [removeCategory.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.value.error = payload;
      } else {
        state.value.error = null;
        state.value.selectedRow = null;
        state.value.refreshData = Date.now();
      }
      state.value.loadingCategories = false;
    },

    [removeCategory.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },

    /*UPDATE*/
    [updateCategory.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
    },

    [updateCategory.fulfilled]: (state, { payload }) => {
      state.value.error = null;
      state.value.selectedRow = null;
      state.value.refreshData = Date.now();
      state.value.loadingCategories = false;
    },

    [updateCategory.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },

    /*FIND ALL BRANDS BY PROJECT ID*/
    [getRootOfCategories.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
    },

    [getRootOfCategories.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload;
      } else {
        state.value.categoriesRoot = payload;
        state.value.error = null;
        state.value.path = [payload];
        state.value.selectedRow = null;
      }
      state.value.loadingCategories = false;
    },

    [getRootOfCategories.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },

    /*GET ALL CATEGORIES BY PROJECT ID*/
    [getAllCategories.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
    },

    [getAllCategories.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload;
      } else {
        state.value.categories = payload;
        state.value.error = null;
      }
      state.value.loadingCategories = false;
    },

    [getAllCategories.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },

    /*GET CHILDREN OF CATEGORY BY PROJECT ID*/
    [getChildrenOfCategory.pending]: (state) => {
      state.value.loadingCategories = true;
      state.value.error = null;
      state.value.selectedRow = null;
    },

    [getChildrenOfCategory.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload;
      } else {
        state.value.categoriesChild = payload;
        state.value.error = null;
        state.value.selectedRow = null;

        //console.log("[getChildrenOfCategory.fulfilled]", payload);
      }
      state.value.loadingCategories = false;
    },

    [getChildrenOfCategory.rejected]: (state, { payload }) => {
      state.value.loadingCategories = false;
      state.value.error = payload;
    },
  },
});

export const {
  setSelectedRowId,
  refreshDataGrid,
  setCategoryRoot,
  getAndRemoveLastItemFromPath,
  addToPath,
  calculateFinalCategries,
  setActivePage,
} = categorySlice.actions;

export default categorySlice.reducer;
