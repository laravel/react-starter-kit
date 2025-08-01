import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import type { FC } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// project-imports
import ThemeBio from '@/sections/admin-panel/online-courses/site/ThemeBio';
import ThemeDomain from '@/sections/admin-panel/online-courses/site/ThemeDomain';
import ThemePage from '@/sections/admin-panel/online-courses/site/ThemePage';
import ThemeSite from '@/sections/admin-panel/online-courses/site/ThemeSite';
import MainCard from '@/components/MainCard';

// Define a configuration array for tabs to make the component data-driven and easier to maintain.
const tabConfig = [
  { key: 'theme', title: 'Theme', Component: ThemeSite },
  { key: 'domain', title: 'Domain', Component: ThemeDomain },
  { key: 'bio', title: 'Bio', Component: ThemeBio },
  { key: 'page', title: 'Page', Component: ThemePage }
];

// Extract tab keys for easier access in navigation logic.
const tabKeys = tabConfig.map((tab) => tab.key);

// ===============================|| ONLINE COURSE - SITE PAGE ||=============================== //

const SitePage: FC = () => {
  const [activeTab, setActiveTab] = useState(tabKeys[0]);

  // Find the index of the currently active tab.
  const activeIndex = tabKeys.indexOf(activeTab);

  const handleNext = () => {
    if (activeIndex < tabKeys.length - 1) {
      setActiveTab(tabKeys[activeIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveTab(tabKeys[activeIndex - 1]);
    }
  };

  // A handler for the final "Finish" button, which would typically submit data.
  const handleFinish = () => {
    console.log('Wizard finished. Submitting data...');
    // Add your form submission logic here.
  };

  return (
    <AppLayout>
      <Head title="Site" />
      <Row>
        <Col xs={12}>
          <MainCard title="Site">
            <div id="basicwizard" className="form-wizard row justify-content-center">
              <Tab.Container id="site-wizard-tabs" activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
                {/* The navigation pills are now generated dynamically from tabConfig. */}
                <Nav variant="pills" className="justify-content-center course-wizard mb-4">
                  {tabConfig.map((tab, index) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link eventKey={tab.key}>
                        <div className="course-wizard-num">
                          <span>{index + 1}</span>
                        </div>
                        <span className="d-none d-sm-inline">{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                {/* The tab content panes are also generated dynamically. */}
                <Tab.Content>
                  {tabConfig.map(({ key, Component }) => (
                    <Tab.Pane key={key} eventKey={key} className="fade">
                      <Component />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>

              {/* A cleaner navigation section with improved UX. */}
              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={handlePrevious} disabled={activeIndex === 0}>
                  Previous
                </Button>

                {activeIndex === tabKeys.length - 1 ? (
                  <Button variant="primary" onClick={handleFinish}>
                    Finish
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleNext}>
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </MainCard>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default SitePage;
