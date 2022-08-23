import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
import TODOLIST from "../components/TODOLIST";
import { auth } from "../lib/firebase";
import { useGetData } from "../lib/hooks";

const ToDoList: NextPage = () => {
    useGetData();
    
    if (!auth.currentUser) return <Login />;

    return (
        <>
            <Head>
                <title>Minimalist To-do App</title>
            </Head>
            <TODOLIST />
        </>
    );
};

export default ToDoList;
