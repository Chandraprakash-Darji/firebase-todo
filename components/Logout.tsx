import { auth } from "../lib/firebase";

const Logout = () => {
    return (
        <div>
            <button
                className="flex relative group border bg-slate-50 text-slate-900 font-bold text-xl px-2 py-1 rounded-md"
                onClick={() => auth.signOut()}
            >
                Log Out
            </button>
        </div>
    );
};

export default Logout;
