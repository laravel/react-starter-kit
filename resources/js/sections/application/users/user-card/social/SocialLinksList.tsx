interface SocialLink {
  platform: string;
  icon: string;
  color: string;
}

// social links
const socialLinks: SocialLink[] = [
  { platform: 'facebook', icon: 'ti-brand-facebook-filled', color: 'text-facebook' },
  { platform: 'twitter', icon: 'ti-brand-twitter-filled', color: 'text-twitter' },
  { platform: 'dribbble', icon: 'ti-brand-dribbble-filled', color: 'text-dribbble' },
  { platform: 'pinterest', icon: 'ti-brand-pinterest-filled', color: 'text-pinterest' },
  { platform: 'youtube', icon: 'ti-brand-youtube-filled', color: 'text-youtube' },
  { platform: 'google', icon: 'ti-brand-google-filled', color: 'text-googleplus' },
  { platform: 'linkedin', icon: 'ti-brand-linkedin-filled', color: 'text-linkedin' }
];

// ==============================||SOCIAL - SOCIAL LINKLIST ||============================== //

export default function SocialLinksList({ isInline }: { isInline?: boolean }) {
  return (
    <ul className={`${isInline ? 'list-unstyled social-top-link' : 'list-inline mt-3'} f-20 mb-0`}>
      {socialLinks.map(({ platform, icon, color }) => (
        <li className={`${isInline ? 'list-item' : 'list-inline-item'}`} key={platform}>
          <a className={`text-${platform}`}>
            <i className={`ti ${icon} ${color}`} />
          </a>
        </li>
      ))}
    </ul>
  );
}
