// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project-imports
import useConfig from '@/hooks/useConfig';

// types
import { ColorOption } from '@/types/customizer';

// assets
import Image7 from '@assets/images/layout/navbar-img-1.jpg';
import Image8 from '@assets/images/layout/navbar-img-2.jpg';
import Image9 from '@assets/images/layout/navbar-img-3.jpg';
import Image10 from '@assets/images/layout/navbar-img-4.jpg';
import Image11 from '@assets/images/layout/navbar-img-5.jpg';
import Image12 from '@assets/images/layout/navbar-img-6.jpg';

const images = [Image7, Image8, Image9, Image10, Image11, Image12];

const navbarImages: ColorOption[] = images.map((img, index) => ({
  id: `preset-${index + 1}`,
  img
}));

// =============================|| CUSTOMIZER - NAVBAR IMAGE THEME ||============================== //

export default function NavbarImageTheme() {
  const { onChangeThemePreset, navbarImg } = useConfig();

  return (
    <ListGroup.Item>
      <h6 className="mb-1">Navbar Image</h6>
      <p className="text-muted text-sm">Choose your Navbar Background Image</p>

      <div className="theme-color navbar-img">
        {navbarImages.map(({ id, img }) => (
          <a
            href="#!"
            className={navbarImg === id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onChangeThemePreset('navbarImg', id);
            }}
            key={id}
            style={{ backgroundImage: `url(${img})` }}
          >
            <i className="ti ti-checks" />
          </a>
        ))}
      </div>
    </ListGroup.Item>
  );
}
