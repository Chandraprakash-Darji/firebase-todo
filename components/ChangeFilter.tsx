import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setFilter } from "../features/configSlice";

const ChangeFilter = () => {
    const {filter} = useAppSelector((state) => state.config);
    const dispatch = useAppDispatch();
    return (
        <div className="flex bg-slate-50/10 border border-slate-50/40 border-l-0 group relative">
            <select
                value={filter}
                onChange={(e) =>
                    (e.target.value === "all" ||
                        e.target.value === "completed" ||
                        e.target.value === "incomplete") &&
                    dispatch(setFilter(e.target.value))
                }
                className="p-3 w-full h-full bg-transparent select-none focus:outline-none"
            >
                <option value="all" className="bg-slate-900">
                    All
                </option>
                <option value="completed" className="bg-slate-900">
                    Completed
                </option>
                <option value="incomplete" className="bg-slate-900">
                    Not Completed
                </option>
            </select>
            <span className="scale-0 group-hover:scale-100 absolute left-1/2 -translate-x-1/2 -bottom-5 text-sm bg-slate-900 px-2 py-1 rounded-md z-50 transition-all duration-200">
                Select
            </span>
        </div>
    );
};

export default ChangeFilter;
