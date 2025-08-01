import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { JSX, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import SectionContent from '@/sections/admin-panel/online-courses/setting/PaymentSection';
import MainCard from '@/components/MainCard';

// ==============================|| SETTING - PAYMENT ||============================== //

export default function PaymentSection(): JSX.Element {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [tax, setTax] = useState<string>('llc');
  const [sales, setSales] = useState<string>('sale1');

  const handleTaxChange = (event: React.ChangeEvent<HTMLSelectElement>): void => setTax(event.target.value);
  const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => setSales(event.target.value);

  const handleNextSection = (): void => setCurrentSection((prev) => (prev < 4 ? prev + 1 : 1));
  const handlePreviousSection = (): void => setCurrentSection((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <AppLayout>
      <Head title="Payment" />
      <Row>
        <Col xs={12}>
          <MainCard title="Payment">
            {currentSection > 1 && (
              <Button variant="link-secondary" onClick={handlePreviousSection} className="d-flex align-items-center">
                <i className="ti ti-chevron-left" />
                Back Step
              </Button>
            )}
            <Row className="justify-content-center p-4">
              <Col xs={12} md={6}>
                <MainCard className="border text-center">
                  <SectionContent
                    currentSection={currentSection}
                    handleTaxChange={handleTaxChange}
                    handleSaleChange={handleSaleChange}
                    tax={tax}
                    sales={sales}
                    handleNextSection={handleNextSection}
                    handlePreviousSection={handlePreviousSection}
                  />
                </MainCard>
              </Col>
            </Row>
          </MainCard>
        </Col>
      </Row>
    </AppLayout>
  );
}
