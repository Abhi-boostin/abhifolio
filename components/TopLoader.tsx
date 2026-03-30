"use client";
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
    return (
        <NextTopLoader
            color="#ffffff"
            initialPosition={0.1}
            height={3}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #ffffff,0 0 5px #ffffff"
        />
    );
}
