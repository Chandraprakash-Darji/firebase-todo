import { TaskNameProps } from "../@types/components";

const TaskName = ({
    task,
    editKey,
    onChange,
    onBlur,
    onKeyUp,
}: TaskNameProps) => {
    return (
        <textarea
            className={`break-words border border-green-500 shadow-[0px_0px_0px_2px_#22c55e] mr-4 disabled:border-slate-50/40 disabled:shadow-none bg-transparent focus:outline-none w-full h-full p-3 resize-none ${
                task.completed && "line-through text-slate-50/60"
            }`}
            value={task.name}
            disabled={editKey !== task.id}
            data-isediting={editKey === task.id}
            data-key={`${task.id}`}
            onChange={onChange}
            onBlur={onBlur}
            rows={task.name.split(/\n/g).length}
            onKeyUp={onKeyUp}
            title={task.name}
        />
    );
};

export default TaskName;
