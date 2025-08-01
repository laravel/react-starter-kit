import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useContext } from 'react';
// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import useLocalStorage from '@/hooks/useLocalStorage';
import LayoutCard from '@/sections/layouts/LayoutCard';
import { ConfigContext } from '@/contexts/ConfigContext';
import useConfig from '@/hooks/useConfig';
import config from '@/config';

import { MenuOrientation } from '@/config';

// types
import { CustomizationProps } from '@/types/config';


export default function TabPage() {
  // const { onChangeMenuOrientation, menuOrientation } = useConfig();
  // onChangeMenuOrientation(menuOrientation as 'tab');

  // setConfig({
  //   ...config,
  //   menuOrientation: 'tab'
  // });

  // const { onChangeMenuOrientation } = useContext(ConfigContext);

  // useEffect(() => {
  //   onChangeMenuOrientation(MenuOrientation.TAB);
  // }, []);


  // const { onChangeMenuOrientation } = useConfig();
  // useEffect(() => {
  //   onChangeMenuOrientation(MenuOrientation.TAB as MenuOrientation);
  //   console.log(MenuOrientation);
  // }, []);


  const { onChangeMenuOrientation, menuOrientation } = useConfig();

  useEffect(() => {
    localStorage.removeItem('datta-able-react-ts-config');
    onChangeMenuOrientation(MenuOrientation.TAB);
    console.log(menuOrientation);
  }, []);

  return (
    // <ConfigProvider value={pageConfig}>
    <AppLayout>
      <Head title="Tab" />
      <Row>
        <Col xs={12}>
          <LayoutCard />
        </Col>
      </Row>
    </AppLayout>
    // </ConfigProvider>
  );
}