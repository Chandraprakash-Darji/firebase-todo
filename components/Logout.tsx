import { setTasks } from "../features/tasksSlice";
import { auth } from "../lib/firebase";
import { useAppDispatch } from "../lib/hooks";

const Logout = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        auth.signOut();
        dispatch(setTasks([]));
    };
    return (
        <div>
            <button
                className="flex relative group border bg-slate-50 text-slate-900 font-bold text-xl px-2 py-1 rounded-md"
                onClick={handleLogout}
            >
                Log Out
            </button>
        </div>
    );
};

export default Logout;
