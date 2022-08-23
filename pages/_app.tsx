import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    const user = useUserData();
    return (
        <Provider store={store}>
            <UserContext.Provider value={user}>
                <Component {...pageProps} />
            </UserContext.Provider>
        </Provider>
    );
}

export default MyApp;
