// project-imports
import Contact from './profile/Contact';
import Other from './profile/Other';
import Personal from './profile/Personal';

// ==============================|| SOCIAL PROFILE - PROFILE ||============================== //

export default function Profile() {
  return (
    <>
      <Personal />
      <Contact />
      <Other />
    </>
  );
}
