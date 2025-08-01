import { useEffect } from 'react';

// react-bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';

// third-party
import ClipboardJS from 'clipboard';

// project-imports
import MainCard from '@/components/MainCard';

const iconList = [
  { name: 'ti-trending-down-2' },
  { name: 'ti-virus' },
  { name: 'ti-wifi' },
  { name: 'ti-yin-yang' },
  { name: 'ti-zodiac-taurus' },
  { name: 'ti-zoom-out' },
  { name: 'ti-discount' },
  { name: 'ti-target' },
  { name: 'ti-eye' },
  { name: 'ti-circle' },
  { name: 'ti-fish' },
  { name: 'ti-checkbox' },
  { name: 'ti-chart-arcs' },
  { name: 'ti-fold' },
  { name: 'ti-bug' },
  { name: 'ti-brand-steam' },
  { name: 'ti-bottle' },
  { name: 'ti-award' },
  { name: 'ti-file' },
  { name: ' ti-git-branch' },
  { name: 'ti-gift' },
  { name: 'ti-hand-off' },
  { name: 'ti-hanger' },
  { name: 'ti-home' },
  { name: 'ti-italic' },
  { name: 'ti-layout' },
  { name: 'ti-letter-d' },
  { name: 'ti-letter-d' },
  { name: 'ti-login' },
  { name: 'ti-logout' },
  { name: 'ti-loader' },
  { name: 'ti-layout-cards' },
  { name: 'ti-map' },
  { name: 'ti-markdown' },
  { name: 'ti-menu' }
];

// =============================|| ICONS - TABLER  ||============================== //

export default function TablerIcons() {
  useEffect(() => {
    const clipboard = new ClipboardJS('.i-block');
    clipboard.on('success', (e) => {
      const targetElement = e.trigger as HTMLElement;
      const badge = document.createElement('span');
      badge.className = 'ic-badge badge bg-success';
      badge.innerText = 'Copied';
      targetElement.appendChild(badge);
      setTimeout(() => {
        targetElement.removeChild(badge);
      }, 3000);
    });

    clipboard.on('error', (e) => {
      const targetElement = e.trigger as HTMLElement;
      const badge = document.createElement('span');
      badge.className = 'ic-badge badge bg-danger';
      badge.innerText = 'Error';
      targetElement.appendChild(badge);
      setTimeout(() => {
        targetElement.removeChild(badge);
      }, 3000);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <MainCard title="Tabler Icons">
      <Stack direction="horizontal" gap={1} id="icon-wrapper" className="i-main flex-wrap align-items-center">
        {iconList.map(({ name }, index) => (
          <OverlayTrigger key={index} placement="top" overlay={<Tooltip id={`tooltip-${index}`}>{name}</Tooltip>}>
            <div className="i-main i-block" data-clipboard-text={name} data-filter={name} title={name}>
              <i className={`ti ${name}`} />
            </div>
          </OverlayTrigger>
        ))}
        <a href="https://tabler.io/icons" target="_blank" className="text-primary">
          more ...
        </a>
      </Stack>
    </MainCard>
  );
}
