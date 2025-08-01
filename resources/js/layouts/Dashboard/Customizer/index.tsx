import { useEffect, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tab from 'react-bootstrap/Tab';
import Tooltip from 'react-bootstrap/Tooltip';
import Stack from 'react-bootstrap/Stack';

// project-imports
import SidebarThemeLayout from './Layout/SidebarTheme';
import ThemeModeLayout from './Layout/ThemeMode';
import SidebarCaption from './Layout/SidebarCaption';
import ThemeLayout from './Layout/ThemeLayout';
import ThemeWidth from './Layout/ThemeWidth';
import CustomTheme from './Color/CustomTheme';
import HeaderTheme from './Color/HeaderTheme';
import NavbarTheme from './Color/NavbarTheme';
import LogoTheme from './Color/LogoTheme';
import CaptionTheme from './Color/CaptionTheme';
import NavbarImageTheme from './Color/NavbarImageTheme';
import MenuIconTheme from './Extra/MenuIcons';
import MenuLinkIconTheme from './Extra/MenuLinkIcons';
import SimpleBarScroll from '@/components/third-party/SimpleBar';
import { ThemeDirection, ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';
import getWindowScheme from '@/utils/getWindowScheme';

// types
import { ColorOption } from '@/types/customizer';

const labels = ['Blue', 'Purple', 'Pink', 'Red', 'Orange', 'Yellow', 'Green', 'Cyan'];

const themeColors: ColorOption[] = Array.from({ length: 8 }, (_, i) => ({
  id: `preset-${i + 1}`,
  label: labels[i]
}));

// =============================|| CUSTOMIZER ||============================== //

export default function Customization() {
  const {
    onReset,
    themeDirection,
    caption,
    sidebarTheme,
    customColor,
    headerColor,
    navbarColor,
    logoColor,
    navbarCaptionColor,
    navbarImg,
    menuIcon,
    menuLinkIcon,
    mode
  } = useConfig();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (themeDirection === ThemeDirection.RTL) {
      document.body.setAttribute('data-pc-direction', ThemeDirection.RTL);
    } else {
      document.body.setAttribute('data-pc-direction', ThemeDirection.LTR);
    }
  }, [themeDirection]);

  useEffect(() => {
    const attributes: Record<string, string | undefined> = {
      'data-pc-sidebar-caption': caption?.toString(),
      'data-pc-sidebar_theme': sidebarTheme?.toString(),
      'data-pc-preset': customColor,
      'data-pc-header': headerColor,
      'data-pc-navbar': navbarColor,
      'data-pc-logo': logoColor,
      'data-pc-caption': navbarCaptionColor,
      'data-pc-navimg': navbarImg,
      'data-pc-drp-menu-icon': menuIcon,
      'data-pc-drp-menu-link-icon': menuLinkIcon !== 'preset-1' ? menuLinkIcon : undefined
    };

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const value = attributes[key];
        if (typeof value === 'string' && value.trim() !== '') {
          document.body.setAttribute(key, value);
        } else {
          document.body.removeAttribute(key);
        }
      }
    }
  }, [caption, sidebarTheme, customColor, headerColor, navbarColor, logoColor, navbarCaptionColor, navbarImg, menuIcon, menuLinkIcon]);

  return (
    <>
      <div className="pct-c-btn">
        <a href="#!" onClick={handleShow}>
          <i className="ph ph-gear-six" />
        </a>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={themeDirection === ThemeDirection.RTL ? 'start' : 'end'}
        className="border-0 pct-offcanvas"
      >
        <Offcanvas.Header className="justify-content-between">
          <Offcanvas.Title>
            <h5 className="mb-0">Settings</h5>
          </Offcanvas.Title>
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded"
              onClick={() => {
                handleClose();
                onReset();
              }}
            >
              Reset
            </Button>
            <Button variant="link-danger" className="avatar avatar-xs btn-pc-default" onClick={handleClose}>
              <i className="ti ti-x f-20" />
            </Button>
          </Stack>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ThemeModeLayout />
        </Offcanvas.Body>

        <Tab.Container defaultActiveKey="pct-1-tab">
          <Nav variant="pills" className="nav-fill pct-tabs" id="myTab" role="tablist">
            <OverlayTrigger placement="top" overlay={<Tooltip>Layout Settings</Tooltip>}>
              <Nav.Item role="presentation">
                <Nav.Link eventKey="pct-1-tab">
                  <i className="ph ph-monitor" />
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Color Settings</Tooltip>}>
              <Nav.Item role="presentation">
                <Nav.Link eventKey="pct-2-tab">
                  <i className="ph ph-palette" />
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Extra Settings</Tooltip>}>
              <Nav.Item role="presentation">
                <Nav.Link eventKey="pct-3-tab">
                  <i className="ph ph-sliders" />
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="pct-1-tab">
              <SimpleBarScroll style={{ height: 'calc(100vh - 240px)' }}>
                <Offcanvas.Body className="py-0">
                  <ListGroup variant="flush">
                    {mode === ThemeMode.LIGHT || (getWindowScheme() === false && mode !== ThemeMode.DARK) ? <SidebarThemeLayout /> : null}
                    <SidebarCaption />
                    <ThemeLayout />
                    {window.innerWidth > 1025 && <ThemeWidth />}
                  </ListGroup>
                </Offcanvas.Body>
              </SimpleBarScroll>
            </Tab.Pane>
            <Tab.Pane eventKey="pct-2-tab">
              <SimpleBarScroll style={{ height: 'calc(100vh - 240px)' }}>
                <Offcanvas.Body className="py-0">
                  <ListGroup variant="flush">
                    <CustomTheme themeColors={themeColors} />
                    <HeaderTheme headerColors={themeColors} />
                    <NavbarTheme navbarColors={themeColors} />
                    <LogoTheme logoColors={themeColors} />
                    <CaptionTheme captionColors={themeColors} />
                    <NavbarImageTheme />
                  </ListGroup>
                </Offcanvas.Body>
              </SimpleBarScroll>
            </Tab.Pane>
            <Tab.Pane eventKey="pct-3-tab">
              <SimpleBarScroll style={{ height: 'calc(100vh - 240px)' }}>
                <Offcanvas.Body className="py-0">
                  <ListGroup variant="flush">
                    <MenuIconTheme />
                    <MenuLinkIconTheme />
                  </ListGroup>
                </Offcanvas.Body>
              </SimpleBarScroll>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Offcanvas>
    </>
  );
}
