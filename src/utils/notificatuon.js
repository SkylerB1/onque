import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showSuccessMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

const showErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export { showSuccessMessage, showErrorMessage };
