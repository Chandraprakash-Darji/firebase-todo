import { TodoButtonProps } from "../@types/components";
import Tooltip from "./Tooltip";

const TodoButton = ({ tip, iconChar, onClick }: TodoButtonProps) => {
    return (
        <button
            className="select-none h-14 text-xl aspect-square border bg-slate-50/10 cursor-pointer border-slate-50/40 group relative focus:outline-none"
            onClick={onClick}
        >
            {iconChar}
            <Tooltip>{tip}</Tooltip>
        </button>
    );
};

export default TodoButton;
