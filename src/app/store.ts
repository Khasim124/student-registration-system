import { configureStore } from "@reduxjs/toolkit";
import courseTypesReducer from "../features/courseTypes/courseTypesSlice";
import coursesReducer from "../features/courses/coursesSlice";
import offeringsReducer from "../features/offerings/offeringsSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  reducer: {
    courseTypes: courseTypesReducer,
    courses: coursesReducer,
    offerings: offeringsReducer,
    registrations: registrationsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
