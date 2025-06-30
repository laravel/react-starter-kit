// File: components/ui/use-toast.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    toast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Toast Item Component
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
                animate-in slide-in-from-right duration-300 ease-out
                ${getVariantStyles(toast.variant || 'default')}
            `}
            style={{
                animation: 'slideInFromRight 0.3s ease-out'
            }}
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

// Toast Container Component
const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <>
            <style>{`
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onRemove={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </>
    );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const toastWithId = { ...newToast, id };

        setToasts(prev => [...prev, toastWithId]);

        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, newToast.duration || 5000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toasts, toast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

// Hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
