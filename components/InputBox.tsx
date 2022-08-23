import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setTask } from "../features/configSlice";
import Loader from "./Loader";
import Tooltip from "./Tooltip";

const InputBox = () => {
    const { task, inputDisabled } = useAppSelector((state) => state.config);
    const dispatch = useAppDispatch();

    return (
        <div className="w-full relative group">
            <input
                type="text"
                placeholder="Add TODO. 😊"
                value={task}
                onChange={(e) => dispatch(setTask(e.target.value))}
                className="p-3 w-full h-full bg-transparent focus:outline-none focus:shadow-[0px_0px_0px_2px_#22c55e] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[0px_0px_0px_2px_#f00]"
                disabled={inputDisabled}
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-32 ">
                {inputDisabled ? <Loader /> : ""}
            </span>
            <Tooltip>
                {inputDisabled ? "Loading" : task ? "edit task" : "add task"}
            </Tooltip>
        </div>
    );
};

export default InputBox;
