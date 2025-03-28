import { useLocalStorage } from '@mantine/hooks';

export function useSideBar() {
    const [state, setState] = useLocalStorage({
        key: 'sidebar',
        defaultValue: true,
    });

    const opened = state + '' === 'true';
    const toggle = () => {
        setState(opened ? false : true);
    };
    return {
        state: opened,
        toggle,
    };
}
