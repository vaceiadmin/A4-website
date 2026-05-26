"use client";

import { useEffect, useState } from "react";
import { isIOSSafari } from "@/lib/utils";

export function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        setIsSafari(isIOSSafari());
    }, []);

    return isSafari;
}
