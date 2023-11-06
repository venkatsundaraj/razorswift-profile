import { Toaster } from 'react-hot-toast';

function ToastProvider({ children }) {
  return (
    <>
      <Toaster reverseOrder={false} position="bottom-right" />
      {children}
    </>
  );
}

export default ToastProvider;
