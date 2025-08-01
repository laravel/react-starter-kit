// third-party
import Swal from 'sweetalert2';

export const handleRadioInput = async () => {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        '#ff0000': 'Red',
        '#00ff00': 'Green',
        '#0000ff': 'Blue'
      });
    }, 1000);
  });
  const { value: color } = await Swal.fire({
    title: 'Select color',
    input: 'radio',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to choose something!';
      }
    }
  });
  if (color) {
    Swal.fire({
      html: `You selected: ` + color
    });
  }
};
