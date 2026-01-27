export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';
import Toast from './toast';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
    toast?: Toast;
};
