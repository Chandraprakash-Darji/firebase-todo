import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { TaskIn } from "./Task";

export interface ToolTipsPops {
    children: string;
}
export interface TodoButtonProps {
    tip: string;
    iconChar: string;
    onClick: () => void;
}
export interface TaskNameProps {
    task: TaskIn;
    editKey: string | null;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e?: FocusEvent<HTMLTextAreaElement, Element>) => void;
    onKeyUp: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}
