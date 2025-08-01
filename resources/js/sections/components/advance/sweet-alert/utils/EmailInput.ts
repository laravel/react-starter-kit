// third-party
import Swal from 'sweetalert2';

export const handleEmailInput = async () => {
  const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputPlaceholder: 'Enter your email address'
  });

  if (email) {
    Swal.fire(`Entered email: ` + email);
  }
};
