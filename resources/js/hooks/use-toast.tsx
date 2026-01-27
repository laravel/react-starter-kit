import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";


export default function useToast() {
    const notification = usePage<SharedData>().props.toast;

    useEffect(() => {
        if (notification?.success) {
            toast.success(notification.success);
        }
        if (notification?.error) {
            toast.error(notification.error);
        }

        if (notification?.info) {
            toast.info(notification.info);
        }

        if (notification?.warning) {
            toast.warning(notification.warning);
        }
    }, [notification]);

}