import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

let lastId = 0;
const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
    projectRemoved: (projects, action) => {
      _.remove(projects, project => project.id === action.payload.id);
    },
  },
});

export default slice.reducer;
export const { projectAdded, projectRemoved } = slice.actions;
