import Swal from 'sweetalert2';

export const showConfirmationDialog = (title, text, onConfirm, onCancel) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'purple',
    cancelButtonColor: 'grey',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true,
    allowOutsideClick: false,
  }).then(result => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
};
