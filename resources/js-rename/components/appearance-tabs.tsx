import { HTMLAttributes } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

interface AppearanceToggleTabProps extends HTMLAttributes<HTMLDivElement> {}

export default function AppearanceToggleTab({ className = '', ...props }: AppearanceToggleTabProps) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ];

  return (
    <div className={`inline-flex bg-neutral-100 dark:bg-neutral-800 p-1 gap-1 rounded-lg ${className}`} {...props}>
      {tabs.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => updateAppearance(value)}
          className={`
            flex items-center px-3.5 py-1.5 rounded-md transition-colors
            ${appearance === value 
              ? 'bg-white dark:bg-neutral-700 shadow-sm dark:text-neutral-100' 
              : 'hover:bg-neutral-200/60 text-neutral-500 hover:text-black dark:hover:bg-neutral-700/60 dark:text-neutral-400'
            }
          `}
        >
          <Icon className="h-4 w-4 -ml-1" />
          <span className="ml-1.5 text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}