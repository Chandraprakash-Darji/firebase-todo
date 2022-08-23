import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import debounce from "lodash.debounce";
import { ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { TaskIn } from "../@types/Task";
import type { AppDispatch, RootState } from "../app/store";
import { setEditKey, setInputDisabled, setTask } from "../features/configSlice";
import {
    addTask,
    deleteTask,
    setTasks,
    updateTask,
} from "../features/tasksSlice";
import { auth, db } from "./firebase";

// Hooks for redux
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Basic App function that interact with Ui
export const useAppFunctions = () => {
    const dispatch = useAppDispatch();
    const { task } = useAppSelector((state) => state.config);
    const { saveTask, deleteFirebaseTask, updateCompleted, updateName } =
        useSetData();

    // Fire when new Todo is Added
    const todoAdded = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task) saveTask(task);
        dispatch(setTask(""));
        dispatch(setEditKey(""));
    };

    // Fire when we What to Task Name change
    const taskNameChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
        task: TaskIn
    ) => {
        if (task) updateName(task);
        dispatch(updateTask({ ...task, name: e.target.value }));
    };

    // Edit Task Name
    const editTask = (key: string) => {
        dispatch(setEditKey(key));
    };

    // Check if Task is Completed
    const checkTask = (task: TaskIn) => {
        updateCompleted({
            ...task,
            completed: !task.completed,
        });
        setEditKey("");
    };
    // Delete Task
    const deleteTaskS = (key: string) => {
        deleteFirebaseTask(key);
        setEditKey("");
    };

    return { todoAdded, taskNameChange, editTask, checkTask, deleteTaskS };
};

// Hook for fetching user when App opened
export function useUserData() {
    // get the current user logegd in
    const [user] = useAuthState(auth);
    // Every time update and return new `user` and `usernamw`
    return { user };
}

// Get Data to Firebase
export const useGetData = () => {
    const dispatch = useAppDispatch();
    const { user } = useUserData();

    useEffect(() => {
        const sync = async () => {
            if (user?.uid) {
                // Making Query
                const querySnapshot = await getDocs(
                    collection(db, "users", user.uid, "tasks")
                );
                console.log(
                    "userGetData",
                    querySnapshot.docs.map((doc) => doc.data())
                );
                // Seting the tasks
                dispatch(
                    setTasks(
                        querySnapshot.docs.map((doc) => ({
                            name: doc.data().name,
                            completed: doc.data().completed,
                            createdAt: doc.data().createdAt,
                            id: doc.id,
                        }))
                    )
                );
            }
        };
        sync();
    }, [user,dispatch]);
};

// Set, Update and Delete Data to Firebase
export const useSetData = () => {
    const dispatch = useAppDispatch();
    const { task } = useAppSelector((state) => state.config);
    const saveTask = async (task: string) => {
        // check for auth
        if (!auth.currentUser?.uid) return;
        // create task
        const tasked = {
            name: task,
            completed: false,
            createdAt: new Date().toDateString(),
        };
        // disable Input box
        dispatch(setInputDisabled(true));
        // adding to firestore
        const docRef = await addDoc(
            collection(db, "users", auth.currentUser?.uid, "tasks"),
            tasked
        );
        // enable input
        dispatch(setInputDisabled(false));
        // adding to redux state
        dispatch(addTask({ ...tasked, id: docRef.id }));
    };
    const updateName = useMemo(
        () =>
            debounce(async (task: TaskIn) => {
                // check for auth
                if (!auth.currentUser?.uid) return;
                // update task
                await updateDoc(
                    doc(db, "users", auth.currentUser?.uid, "tasks", task.id),
                    {
                        name: task.name,
                    }
                );
            }, 500),
        []
    );
    const updateCompleted = async (task: TaskIn) => {
        // check for auth
        if (!auth.currentUser?.uid) return;
        // update task
        await updateDoc(
            doc(db, "users", auth.currentUser?.uid, "tasks", task.id),
            {
                completed: task.completed,
            }
        );
        dispatch(updateTask(task));
    };
    const deleteFirebaseTask = async (key: string) => {
        // check for auth
        if (!auth.currentUser?.uid) return;
        // delete redux state
        dispatch(deleteTask(key));
        // delete task
        await deleteDoc(doc(db, "users", auth.currentUser?.uid, "tasks", key));
    };

    return { saveTask, updateName, updateCompleted, deleteFirebaseTask };
};
