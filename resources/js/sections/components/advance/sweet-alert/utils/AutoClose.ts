// third-party
import Swal from 'sweetalert2';

export function handleAutoClose() {
  let timerInterval: ReturnType<typeof setInterval>;

  Swal.fire({
    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    willOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        const htmlContainer = Swal.getHtmlContainer();
        if (htmlContainer) {
          const b = htmlContainer.querySelector('b');
          if (b) {
            b.textContent = Swal.getTimerLeft()?.toString() || '';
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
}
