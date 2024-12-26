import { toast } from "react-toastify";

const useToast = () => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
  };
  const successToast = (message, option = {}) => {
    toast.success(message, { ...options, ...option });
  };
  const errorToast = (message, option = {}) => {
    toast.error(message, { ...options, ...option });
  };
  return { successToast,errorToast };
};

export default useToast;
