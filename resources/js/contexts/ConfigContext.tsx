import { createContext, ReactElement, useEffect } from 'react';

// project-imports
import useLocalStorage from '@/hooks/useLocalStorage';
import config, { MenuOrientation, ThemeDirection, ThemeMode } from '@/config';

// types
import { CustomizationProps, I18n } from '@/types/config';

// initial state
const initialState: CustomizationProps = {
  ...config,
  onChangeLocalization: () => {},
  onChangeMenuOrientation: () => {},
  onChangeDirection: () => {},
  onChangeContainer: () => {},
  onChangeCaption: () => {},
  onChangeSideTheme: () => {},
  onChangeThemePreset: () => {},
  onChangeMenuIcon: () => {},
  onChangeMode: () => {},
  onReset: () => {}
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactElement;
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('datta-able-react-ts-config', initialState);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1025 && config.menuOrientation !== 'vertical') {
      setConfig((prevConfig: any) => ({
        ...prevConfig,
        menuOrientation: 'vertical'
      }));
    }
  }, []);

  const onReset = () => {
    setConfig(initialState);
  };

  const onChangeLocalization = (lang: I18n) => {
    setConfig({
      ...config,
      i18n: lang
    });
  };

  const onChangeMenuOrientation = (layout: MenuOrientation) => {
    if (window.innerWidth >= 1025) {
      setConfig({
        ...config,
        menuOrientation: layout
      });
    }
  };

  const onChangeMode = (selectedMode: ThemeMode) => {
    setConfig({
      ...config,
      mode: selectedMode
    });
  };

  const onChangeCaption = (caption: boolean) => {
    setConfig({
      ...config,
      caption: caption
    });
  };

  const onChangeSideTheme = (sidebarTheme: boolean) => {
    setConfig({
      ...config,
      sidebarTheme: sidebarTheme
    });
  };

  const onChangeDirection = (direction: ThemeDirection) => {
    setConfig({
      ...config,
      themeDirection: direction
    });
  };

  const onChangeContainer = (container: boolean) => {
    setConfig({
      ...config,
      container: container
    });
  };

  const onChangeThemePreset = (key: string, value: string) => {
    setConfig({
      ...config,
      [key]: value
    });
  };

  const onChangeMenuIcon = (key: string, value: string) => {
    setConfig({
      ...config,
      [key]: value
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocalization,
        onChangeMenuOrientation,
        onChangeMode,
        onChangeDirection,
        onChangeContainer,
        onChangeCaption,
        onChangeSideTheme,
        onChangeThemePreset,
        onChangeMenuIcon,
        onReset
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
