import { usePage } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { FlashMessages, SharedData } from "@/types";

export default function FlashMessageDisplayer() {
    const { props } = usePage<SharedData>();
    const flash: FlashMessages = props.flash ?? {};
    const responseUuid = props.response_uuid;

    const lastUuidRef = useRef<string>("");

    useEffect(() => {
        // Avoid duplicate display
        if (!responseUuid || lastUuidRef.current === responseUuid) return;

        lastUuidRef.current = responseUuid;

        if (flash.success) {
            toast.success(flash.success, { className: "bg-white text-black" });
        }
        if (flash.error) {
            toast.error(flash.error, { className: "bg-white text-black" });
        }
        if (flash.info) {
            toast(flash.info, { className: "bg-white text-black" });
        }
        if (flash.warning) {
            toast.warning(flash.warning, { className: "bg-white text-black" });
        }
    }, [responseUuid, flash]);

    return <Toaster position="top-right" />;
}
