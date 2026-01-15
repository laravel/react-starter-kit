export type * from './auth';
export type * from './components';
export type * from './forms';
export type * from './hooks';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}
