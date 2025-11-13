import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType, ID } from "../../types";
import { v4 as uuid } from "uuid";

type State = CourseType[];

const initialState: State = [];

const sortByName = (items: State) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

const courseTypesSlice = createSlice({
  name: "courseTypes",
  initialState,
  reducers: {
    addCourseType: {
      reducer(state, action: PayloadAction<CourseType>) {
        const trimmed = action.payload.name.trim().toLowerCase();
        if (state.some((c) => c.name.trim().toLowerCase() === trimmed)) {
          return state;
        }
        return sortByName([...state, action.payload]);
      },
      prepare(name: string) {
        const trimmed = name.trim();
        return { payload: { id: uuid(), name: trimmed } };
      },
    },
    updateCourseType(state, action: PayloadAction<{ id: ID; name: string }>) {
      const trimmed = action.payload.name.trim();
      const updated = state.map((c) =>
        c.id === action.payload.id ? { ...c, name: trimmed } : c
      );
      return sortByName(updated);
    },
    deleteCourseType(state, action: PayloadAction<ID>) {
      const filtered = state.filter((c) => c.id !== action.payload);
      return sortByName(filtered);
    },
  },
});

export const { addCourseType, updateCourseType, deleteCourseType } =
  courseTypesSlice.actions;

export default courseTypesSlice.reducer;
