import { useState } from 'react';

// react-bootstrap
import Nav from 'react-bootstrap/Nav';

// project-imports
import MainCard from '@/components/MainCard';

type WeeklyEarningCardProps = {
  title: string;
  icon: string;
  subtitle: string;
  data: Record<string, number | string>;
  defaultDay: string;
};

// =============================|| WEEKLY EARNING CARD ||============================== //

export default function WeeklyEarningCard({ title, icon, subtitle, data, defaultDay }: WeeklyEarningCardProps) {
  const [key, setKey] = useState<string>(defaultDay);

  return (
    <MainCard className="bg-brand-color-1 earning-date" headerClassName="border-0" title={<span className="text-white">{title}</span>}>
      <div className="bd-example">
        <h2 className="text-white mb-3 f-w-300">
          {data[key]}
          <i className={icon} />
        </h2>
        <span className="text-white mb-4 d-block">{subtitle}</span>

        {/* Navigation Tabs */}
        <Nav
          variant="pills"
          className="justify-content-center"
          activeKey={key}
          onSelect={(selectedKey: string | null) => setKey(selectedKey ?? defaultDay)}
        >
          {Object.keys(data).map((day) => (
            <Nav.Item key={day}>
              <Nav.Link eventKey={day} className={` ${key === day ? 'bg-white' : 'text-white'}`}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </MainCard>
  );
}
