// third-party
import Swal from 'sweetalert2';

// ==============================|| DATA ||============================== //

export function showMessage() {
  Swal.fire('Any fool can use a computer');
}

export function showTitleAndText() {
  Swal.fire('The Internet?', 'That thing is still around?', 'question');
}

export function showErrorIcon() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}

export function showLongContent() {
  Swal.fire({
    imageUrl: 'https://placeholder.pics/svg/300x1500',
    imageHeight: 1500,
    imageAlt: 'A tall image'
  });
}

export function showCustomPosition() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  });
}

export function handleCustomImage() {
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image'
  });
}

// Handler for RTL language
export function handleRtlLanguage() {
  Swal.fire({
    title: 'هل تريد الاستمرار؟',
    icon: 'question',
    iconHtml: '؟',
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا',
    showCancelButton: true,
    showCloseButton: true
  });
}

// Function for Success Modal
export function showSuccessModal() {
  Swal.fire({ icon: 'success', title: 'Success modal' });
}

// Function for Error Modal
export function showErrorModal() {
  Swal.fire({ icon: 'error', title: 'Error modal' });
}

// Function for Warning Modal
export function showWarningModal() {
  Swal.fire({ icon: 'warning', title: 'Warning modal' });
}

// Function for Info Modal
export function showInfoModal() {
  Swal.fire({ icon: 'info', title: 'Info modal' });
}

// Function for Question Modal
export function showQuestionModal() {
  Swal.fire({ icon: 'question', title: 'Question modal' });
}

// Function for URL Input
export const handleURLInput = async () => {
  const { value: url } = await Swal.fire({
    input: 'url',
    inputPlaceholder: 'Enter the URL'
  });
  if (url) {
    Swal.fire(`Entered URL: ` + url);
  }
};
