// third-party
import Swal from 'sweetalert2';

export const handleFileInput = async () => {
  const { value: file } = await Swal.fire({
    title: 'Select image',
    input: 'file',
    customClass: {
      input: 'form-control border'
    },
    inputAttributes: {
      accept: 'image/*',
      'aria-label': 'Upload your profile picture'
    }
  });

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: result, // `result` is now guaranteed to be a string
          imageAlt: 'The uploaded picture'
        });
      } else {
        Swal.fire('Error', 'The file is not an image', 'error');
      }
    };

    reader.readAsDataURL(file);
  }
};
