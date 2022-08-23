import { configureStore } from "@reduxjs/toolkit";
import configSlice from "../features/configSlice";
import tasksSlice from "../features/tasksSlice";

export const store = configureStore({
    reducer: {
        // Stores all the rasks
        tasks: tasksSlice,
        // Stores all the config settings
        config: configSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
