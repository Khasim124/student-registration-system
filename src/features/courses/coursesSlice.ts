import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, ID } from "../../types";
import { v4 as uuid } from "uuid";

type State = Course[];

const initialState: State = [];

const sortByName = (items: State) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

const slice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: {
      reducer(state, action: PayloadAction<Course>) {
        const trimmed = action.payload.name.trim().toLowerCase();
        if (state.some((c) => c.name.toLowerCase() === trimmed)) {
          return state;
        }
        return sortByName([...state, action.payload]);
      },
      prepare(name: string) {
        const trimmed = name.trim();
        return { payload: { id: uuid(), name: trimmed } };
      },
    },
    updateCourse(state, action: PayloadAction<{ id: ID; name: string }>) {
      const trimmed = action.payload.name.trim();
      const updated = state.map((c) =>
        c.id === action.payload.id ? { ...c, name: trimmed } : c
      );
      return sortByName(updated);
    },
    deleteCourse(state, action: PayloadAction<ID>) {
      const filtered = state.filter((c) => c.id !== action.payload);
      return sortByName(filtered);
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = slice.actions;
export default slice.reducer;
