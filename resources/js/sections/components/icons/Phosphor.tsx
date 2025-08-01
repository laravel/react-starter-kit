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
  { name: 'ph-user' },
  { name: 'ph-address-book' },
  { name: 'ph-airplane' },
  { name: 'ph-arrow-clockwise' },
  { name: 'ph-bell-simple' },
  { name: 'ph-calendar-check' },
  { name: 'ph-cards' },
  { name: 'ph-caret-down' },
  { name: 'ph-check' },
  { name: 'ph-clock' },
  { name: 'ph-dots-three-vertical' },
  { name: 'ph-facebook-logo' },
  { name: 'ph-file-text' },
  { name: 'ph-gear' },
  { name: 'ph-globe' },
  { name: 'ph-heart' },
  { name: 'ph-house' },
  { name: 'ph-link' },
  { name: 'ph-list' },
  { name: 'phi-phone' },
  { name: 'ph-play-circle' },
  { name: 'ph-plus' },
  { name: 'ph-share-network' },
  { name: 'ph-camera' },
  { name: 'ph-shield-check' },
  { name: 'ph-user' },
  { name: 'ph-users' },
  { name: 'ph-sign-in' },
  { name: 'ph-sign-out' },
  { name: 'ph-spinner' },
  { name: 'ph-smiley' },
  { name: 'ph-warning-circle' },
  { name: 'ph-trash' },
  { name: 'ph-whatsapp-logo' },
  { name: 'ph-youtube-logo' }
];

// =============================|| ICONS - PHOSPHOR  ||============================== //

export default function PhosphorIcons() {
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
    <MainCard title="Phosphor Icons">
      <Stack direction="horizontal" gap={1} id="icon-wrapper" className="i-main flex-wrap align-items-center">
        {iconList.map(({ name }, index) => (
          <OverlayTrigger key={index} placement="top" overlay={<Tooltip id={`tooltip-${index}`}>{name}</Tooltip>}>
            <div className="i-block" data-clipboard-text={name} data-filter={name} title={name}>
              <i className={`ph ${name}`} />
            </div>
          </OverlayTrigger>
        ))}
        <a href="https://phosphoricons.com/" target="_blank" className="text-primary">
          more ...
        </a>
      </Stack>
    </MainCard>
  );
}
