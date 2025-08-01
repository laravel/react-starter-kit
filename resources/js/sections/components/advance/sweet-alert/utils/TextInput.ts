// third-party
import Swal from 'sweetalert2';

export const handleTextInput = async () => {
  const ipAPI = 'https://api.ipify.org?format=json'; // Use HTTPS for reliability

  try {
    // Fetch the IP address
    const response = await fetch(ipAPI);
    if (!response.ok) {
      throw new Error('Failed to fetch IP address');
    }
    const data = await response.json();
    const inputValue = data.ip;

    // Show SweetAlert with input
    const { value: ipAddress } = await Swal.fire({
      title: 'Enter your IP address',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
        return null; // Validation passed
      }
    });

    // Show result
    if (ipAddress) {
      await Swal.fire(`Your IP address is: ${ipAddress}`);
    }
  } catch (error) {
    console.error('Error:', error);
    await Swal.fire('Error', 'Failed to fetch IP address. Please try again later.', 'error');
  }
};
