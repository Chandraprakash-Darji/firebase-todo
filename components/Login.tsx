import { signInWithPopup } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { auth, googleAuth } from "../lib/firebase";

const Login = () => {
    const signInWithGoggle = async () => {
        await signInWithPopup(auth, googleAuth);
    };
    return (
        <div className="flex flex-col items-center bg-slate-900/70 rounded-xl shadow-xl p-8 gap-8 w-[35rem] mt-16 border border-slate-50/20">
            <Head>
                <title>Login - Minimalist To-do App</title>
            </Head>
            <button
                className="bg-slate-50/20 px-4 py-3 rounded-md flex justify-center items-center gap-2 font-bold"
                onClick={signInWithGoggle}
            >
                <Image src="/google.png" alt="google" width={30} height={30} />{" "}
                Sign in with Goggle
            </button>
        </div>
    );
};

export default Login;
