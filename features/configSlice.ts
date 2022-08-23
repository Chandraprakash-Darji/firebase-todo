import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateIn {
    editKey: string | null;
    task: string;
    filter: "all" | "incomplete" | "completed";
    inputDisabled: boolean;
}

let initialState: initialStateIn = {
    editKey: null,
    task: "",
    filter: "all",
    inputDisabled: false,
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setEditKey: (state, action: PayloadAction<string | null>) => {
            return { ...state, editKey: action.payload };
        },
        setTask: (state, action: PayloadAction<string>) => {
            return { ...state, task: action.payload };
        },
        setFilter: (
            state,
            action: PayloadAction<"all" | "incomplete" | "completed">
        ) => {
            return { ...state, filter: action.payload };
        },
        setInputDisabled: (state, action: PayloadAction<boolean>) => {
            return { ...state, inputDisabled: action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEditKey, setFilter, setTask, setInputDisabled } =
    configSlice.actions;

export default configSlice.reducer;
