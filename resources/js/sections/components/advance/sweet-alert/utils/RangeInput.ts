// third-party
import Swal from 'sweetalert2';

export const handleRangeInput = async () => {
  Swal.fire({
    title: 'How old are you?',
    icon: 'question',
    input: 'range',
    inputAttributes: {
      min: '8', // Convert to string
      max: '120', // Convert to string
      step: '1' // Convert to string
    },
    inputValue: 25 // This can remain a number
  });
};
