import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from './use-toast';

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

interface ToastItemProps {
    toast: Toast;
    onRemove: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove();
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [onRemove, toast.duration]);

    const getVariantStyles = (variant: string) => {
        switch (variant) {
            case 'destructive':
                return 'bg-red-50 border-red-200 text-red-900';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-900';
            default:
                return 'bg-white border-gray-200 text-gray-900';
        }
    };

    const getIcon = (variant: string) => {
        switch (variant) {
            case 'destructive':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            case 'success':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            default:
                return <Info className="h-4 w-4 text-blue-600" />;
        }
    };

    return (
        <div
            className={`
                flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[400px]
                animate-in slide-in-from-right-full duration-300
                ${getVariantStyles(toast.variant || 'default')}
            `}
        >
            {getIcon(toast.variant || 'default')}
            <div className="flex-1 space-y-1">
                <h4 className="font-medium text-sm">{toast.title}</h4>
                {toast.description && (
                    <p className="text-sm opacity-90">{toast.description}</p>
                )}
            </div>
            <button
                onClick={onRemove}
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

export default ToastContainer;
