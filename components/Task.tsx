import { useEffect } from "react";
import { TaskIn } from "../@types/Task";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setEditKey } from "../features/configSlice";
import { useAppFunctions } from "../lib/hooks";
import TaskNameProps from "./TaskNameProps";
import TodoButton from "./TodoButton";

const Task = ({ task }: { task: TaskIn }) => {
    const { editKey } = useAppSelector((state) => state.config);
    const dispatch = useAppDispatch();
    const { taskNameChange, checkTask, editTask, deleteTaskS } =
        useAppFunctions();
    useEffect(() => {
        if (editKey)
            (
                document.querySelector(
                    `[data-key="${editKey}"]`
                ) as HTMLTextAreaElement
            )?.focus();
    }, [editKey]);

    return (
        <div
            className="flex border-slate-50/40 items-start backdrop-blur w-full h-full transition-all duration-300"
            style={{ animation: "popIn 300ms forwards" }}
            key={task.id}
        >
            <form
                className="w-full h-full flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(setEditKey(""));
                }}
            >
                <TaskNameProps
                    task={task}
                    editKey={editKey}
                    onChange={(e) => taskNameChange(e, task)}
                    onBlur={() => dispatch(setEditKey(null))}
                    onKeyUp={(e) => {
                        if (e.key === "Escape") dispatch(setEditKey(""));
                    }}
                />
            </form>
            <div className="flex gap-3">
                <TodoButton
                    iconChar="✎"
                    tip="Edit"
                    onClick={() => editTask(task.id)}
                />
                <TodoButton
                    iconChar="✓"
                    tip={task.completed ? "Uncheck" : "Check"}
                    onClick={() => checkTask(task)}
                />
                <TodoButton
                    iconChar="×"
                    tip="Delete"
                    onClick={() => deleteTaskS(task.id)}
                />
            </div>
        </div>
    );
};

export default Task;
