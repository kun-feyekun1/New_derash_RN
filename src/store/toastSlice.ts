import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
export type ToastKind = "success" | "error" | "info";
export type Toast = {
  id: string;
  kind: ToastKind;
  message: string;
};

type ToastState = {
  active: Toast | null;
};

const initialState: ToastState = {
  active: null,
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.active = action.payload;
      },
      prepare(message: string, kind: ToastKind = "info") {
        return { payload: { id: nanoid(), message, kind } };
      },
    },
    hideToast(state) {
      state.active = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
