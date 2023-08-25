import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {resources} from "./react-i18next/resources";
import {createRoot} from "react-dom/client";
import React, {lazy, Suspense} from "react";
import reportWebVitals from "./reportWebVitals";
import {ViewportProvider} from "./core/hooks/useViewport";
import {Loading} from "@hi-ui/hiui";

i18next.use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "zh",
        lng: navigator.language,
    })

const App = lazy(() => import("./ui/pages/App"))

const container = document.getElementById("root") as Element;
const root = createRoot(container);
root.render(
    <ViewportProvider>
        <Suspense fallback={<Loading full={true}/>}>
            <App />
        </Suspense>
    </ViewportProvider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
