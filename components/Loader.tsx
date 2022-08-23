const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <span className="w-10 aspect-square border-slate-900 border-4 rounded-full absolute"></span>
            <span className="w-10 aspect-square border-l-slate-50 border-4 border-transparent rounded-full animate-spin"></span>
        </div>
    );
};

export default Loader;
