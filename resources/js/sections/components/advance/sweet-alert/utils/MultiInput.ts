// third-party
import Swal from 'sweetalert2';

export const handleMultipleInputs = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Multiple inputs',
    html: '<input id="swal-input1" class="swal2-input">' + '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      const input1 = document.getElementById('swal-input1') as HTMLInputElement | null;
      const input2 = document.getElementById('swal-input2') as HTMLInputElement | null;

      if (!input1 || !input2) {
        Swal.showValidationMessage('Please fill out both fields!');
        return;
      }

      return [input1.value, input2.value];
    }
  });

  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
  }
};
