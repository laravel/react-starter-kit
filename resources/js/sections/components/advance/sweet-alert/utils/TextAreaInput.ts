// third-party
import Swal from 'sweetalert2';

export const handleTextareaInput = async () => {
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputPlaceholder: 'Type your message here...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  });
  if (text) {
    Swal.fire(text);
  }
};
