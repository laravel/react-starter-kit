declare module 'fslightbox-react' {
  const FsLightbox: React.FC<{
    toggler: boolean;
    sources: Array<string | JSX.Element>;
    slide?: number;
    onOpen?: () => void;
    onClose?: () => void;
    className?: string;
  }>;

  export default FsLightbox;
}
