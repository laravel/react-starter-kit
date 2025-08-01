// third-party
import Swal from 'sweetalert2';

export const handleSelectInput = async () => {
  const { value: fruit } = await Swal.fire({
    title: 'Select field validation',
    input: 'select',
    inputOptions: {
      Fruits: {
        apples: 'Apples',
        bananas: 'Bananas',
        grapes: 'Grapes',
        oranges: 'Oranges'
      },
      Vegetables: {
        potato: 'Potato',
        broccoli: 'Broccoli',
        carrot: 'Carrot'
      },
      icecream: 'Ice cream'
    },
    inputPlaceholder: 'Select a fruit',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === 'oranges') {
          resolve();
        } else {
          resolve('You need to select oranges :)');
        }
      });
    }
  });
  if (fruit) {
    Swal.fire(`You selected: ` + fruit);
  }
};
