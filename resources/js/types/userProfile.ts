import { ReactElement, ReactNode } from 'react';

export interface UserProfileProps {
  activeProfileTab?: string;
  showEmailAlert?: boolean;
  isPersonalEdit?: boolean;
  isContactEdit?: boolean;
  isOtherEdit?: boolean;
  viewerIsOpen?: boolean;
  currentImage?: number;
  handleActiveProfileTab?: (value: string) => void;
  handleShowEmailAlert?: (value: boolean) => void;
  handleIsPersonalEdit?: (value: boolean) => void;
  handleIsContactEdit?: (value: boolean) => void;
  handleIsOtherEdit?: (value: boolean) => void;
  handleOpenLightBox?: (e: React.MouseEvent<HTMLElement>, index: number) => void;
  handleCloseLightBox?: () => void;
}

export interface Photo {
  src: string;
  thumb: string;
  width: number;
  height: number;
  caption?: ReactElement | number;
}

export interface Gallery {
  src: string;
  thumbnail: string;
  caption?: string;
  useForDemo: boolean;
}

export interface SimpleGalleryProps {
  images?: Array<Gallery | Photo> | any;
  texts?: Array<ReactNode>;
  singleItem?: boolean | any;
  backdropClosesModal?: boolean;
  heading?: ReactElement;
  videos?: Array<any>;
  subheading?: ReactElement;
}

export interface LightBoxProps {
  currentImage: number;
  photos: Array<Gallery | Photo> | any;
}
