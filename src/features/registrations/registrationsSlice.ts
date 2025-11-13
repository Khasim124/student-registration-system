import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Registration, ID } from "../../types";
import { v4 as uuid } from "uuid";

type State = Registration[];

const initialState: State = [];

const sortByName = (items: State) =>
  [...items].sort((a, b) => a.studentName.localeCompare(b.studentName));

const slice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    addRegistration: {
      reducer(state, action: PayloadAction<Registration>) {
        const nameA = action.payload.studentName.trim().toLowerCase();
        const emailA = action.payload.studentEmail?.trim().toLowerCase() || "";

        const exists = state.some((r) => {
          if (r.offeringId !== action.payload.offeringId) return false;

          const nameB = r.studentName.trim().toLowerCase();
          const emailB = r.studentEmail?.trim().toLowerCase() || "";

          const sameName = nameA === nameB;

          const sameEmail =
            (emailA === "" && emailB === "") ||
            (emailA !== "" && emailA === emailB);

          return sameName && sameEmail;
        });

        if (exists) return state;

        return sortByName([...state, action.payload]);
      },
      prepare(offeringId: string, studentName: string, studentEmail?: string) {
        return {
          payload: {
            id: uuid(),
            offeringId,
            studentName: studentName.trim(),
            studentEmail: studentEmail?.trim(),
          },
        };
      },
    },
    deleteRegistration(state, action: PayloadAction<ID>) {
      const filtered = state.filter((r) => r.id !== action.payload);
      return sortByName(filtered);
    },
  },
});

export const { addRegistration, deleteRegistration } = slice.actions;
export default slice.reducer;
