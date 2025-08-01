// third-party
import Swal from 'sweetalert2';

export const handlePasswordInput = async () => {
  const { value: password } = await Swal.fire({
    title: 'Enter your password',
    input: 'password',
    inputPlaceholder: 'Enter your password',
    inputAttributes: {
      maxlength: '10', // Change from number to string
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });
  if (password) {
    Swal.fire(`Entered password: ${password}`);
  }
};
