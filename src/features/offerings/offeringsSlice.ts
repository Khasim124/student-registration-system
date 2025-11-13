import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Offering, ID } from "../../types";
import { v4 as uuid } from "uuid";

type State = Offering[];

const initialState: State = [];

const sortOfferings = (items: State) =>
  [...items].sort((a, b) => {
    const aLabel = `${a.courseTypeId}-${a.courseId}`;
    const bLabel = `${b.courseTypeId}-${b.courseId}`;
    return aLabel.localeCompare(bLabel);
  });

const slice = createSlice({
  name: "offerings",
  initialState,
  reducers: {
    addOffering: {
      reducer(state, action: PayloadAction<Offering>) {
        if (
          state.some(
            (o) =>
              o.courseId === action.payload.courseId &&
              o.courseTypeId === action.payload.courseTypeId
          )
        ) {
          return state;
        }
        return sortOfferings([...state, action.payload]);
      },
      prepare(courseId: string, courseTypeId: string) {
        return { payload: { id: uuid(), courseId, courseTypeId } };
      },
    },
    updateOffering(
      state,
      action: PayloadAction<{ id: ID; courseId: ID; courseTypeId: ID }>
    ) {
      const exists = state.some(
        (o) =>
          o.id !== action.payload.id &&
          o.courseId === action.payload.courseId &&
          o.courseTypeId === action.payload.courseTypeId
      );
      if (exists) return state;
      const updated = state.map((o) =>
        o.id === action.payload.id
          ? {
              ...o,
              courseId: action.payload.courseId,
              courseTypeId: action.payload.courseTypeId,
            }
          : o
      );
      return sortOfferings(updated);
    },
    deleteOffering(state, action: PayloadAction<ID>) {
      const filtered = state.filter((o) => o.id !== action.payload);
      return sortOfferings(filtered);
    },
  },
});

export const { addOffering, updateOffering, deleteOffering } = slice.actions;
export default slice.reducer;
