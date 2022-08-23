import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import Login from "../components/Login";
import TODOLIST from "../components/TODOLIST";
import { UserContext } from "../lib/context";
import { useGetData } from "../lib/hooks";

const ToDoList: NextPage = () => {
    const { user } = useContext(UserContext);
    useGetData();

    if (!user) return <Login />;

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
