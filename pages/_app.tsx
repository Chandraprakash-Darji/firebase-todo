import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    const user = useUserData();
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
