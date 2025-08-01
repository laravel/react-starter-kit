// third-party
import Swal from 'sweetalert2';

export function showThreeButtons() {
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: "Don't save"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success');
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  });
}
