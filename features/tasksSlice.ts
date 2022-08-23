import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskIn } from "../@types/Task";

const initialState: TaskIn[] = [];

export const TasksSlice = createSlice({
    name: "Tasks",
    initialState,
    reducers: {
        //* Intiallize Tasks
        setTasks: (_, action: PayloadAction<TaskIn[]>) => {
            return action.payload;
        },

        // //* To Add the task
        addTask: (state, actions: PayloadAction<TaskIn>) => {
            return [...state, actions.payload];
        },

        //* To Complete or Name change
        updateTask: (state, action: PayloadAction<TaskIn>) => {
            return [...state].map((task) => {
                return task.id === action.payload.id ? action.payload : task;
            });
        },

        //* Delete Task
        deleteTask: (state, action: PayloadAction<string>) => {
            return state.filter((task) => task.id !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const {addTask, setTasks, deleteTask, updateTask } = TasksSlice.actions;

export default TasksSlice.reducer;
