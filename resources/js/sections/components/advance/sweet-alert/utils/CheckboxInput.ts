// third-party
import Swal from 'sweetalert2';

export const handleCheckboxInput = async () => {
  const { value: accept } = await Swal.fire({
    title: 'Terms and conditions',
    input: 'checkbox',
    inputValue: 1,
    inputPlaceholder: 'I agree with the terms and conditions',
    confirmButtonText: 'Continue<i class="ti ti-arrow-right"/>',
    inputValidator: (result) => {
      return !result && 'You need to agree with T&C';
    }
  });
  if (accept) {
    Swal.fire('You agreed with T&C :)');
  }
};
