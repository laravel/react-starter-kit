// third-party
import Swal from 'sweetalert2';

export function showCustomHtml() {
  Swal.fire({
    title: '<strong>HTML <u>example</u></strong>',
    icon: 'info',
    html: 'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="ti ti-thumb-up-filled"/> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText: '<i class="ti ti-thumb-down-filled"/>',
    cancelButtonAriaLabel: 'Thumbs down'
  });
}
