import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setTasks } from "../features/tasksSlice";
import { auth } from "../lib/firebase";
import { useAppFunctions } from "../lib/hooks";
import ChangeFilter from "./ChangeFilter";
import InputBox from "./InputBox";
import Loader from "./Loader";
import Logout from "./Logout";
import Task from "./Task";
import TodoButton from "./TodoButton";

const ToDoList = () => {
    const tasks = useAppSelector((state) => state.tasks);
    const { filter } = useAppSelector((state) => state.config);
    const dispatch = useAppDispatch();
    const { todoAdded } = useAppFunctions();

    return (
        <div className="flex flex-col items-center bg-slate-900/70 rounded-xl shadow-xl p-8 gap-8 w-[35rem] mt-16 border border-slate-50/20">
            {/* Heading */}
            <h2 className="text-3xl">
                {auth.currentUser ? `${auth.currentUser?.displayName}'s` : ""}{" "}
                Todo List
            </h2>
            {/* Add Task Box */}
            <div className="flex justify-between w-full">
                <form
                    className="w-full flex justify-between"
                    onSubmit={todoAdded}
                >
                    <div className="flex bg-slate-50/10 border border-slate-50/40 w-full border-r-transparent">
                        <InputBox />
                    </div>

                    <TodoButton
                        iconChar="&#x23CE;"
                        onClick={() => {}}
                        tip="Enter"
                    />
                </form>
                <ChangeFilter />
            </div>
            {/* Tasks Box */}
            <div className="flex flex-col gap-4 w-full h-full">
                {/* Loader when loading tasks */}
                {!tasks && <Loader />}
                {/* List of tasks */}
                {tasks
                    .slice(0)
                    .reverse()
                    ?.filter((t) => {
                        if (filter === "completed") return t.completed;
                        if (filter === "incomplete") return !t.completed;
                        return true;
                    })
                    .map((task) => (
                        <Task task={task} key={task.id} />
                    ))}
            </div>
            <Logout />
        </div>
    );
};

export default ToDoList;
