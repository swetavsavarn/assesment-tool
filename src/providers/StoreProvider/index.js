"use client";
import store, { persistor } from "@/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";



export default function StoreProvider({
    children,
}) {
    const storeRef = useRef();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store
    }

    return <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}
