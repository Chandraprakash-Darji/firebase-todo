import { ToolTipsPops } from "../@types/components";

const Tooltip = ({ children }: ToolTipsPops) => {
    return (
        <span className="scale-0 group-hover:scale-100 absolute left-1/2 -translate-x-1/2 -bottom-5 text-sm bg-slate-900 px-2 py-1 rounded-md z-50 transition-all duration-200 ">
            {children}
        </span>
    );
};

export default Tooltip;
