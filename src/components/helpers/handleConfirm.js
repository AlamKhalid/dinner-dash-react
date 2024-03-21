import { confirmAlert } from "react-confirm-alert";

const handleConfirm = (title, message, handleYes, handleNo = null) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: "Yes",
        onClick: handleYes,
      },
      {
        label: "No",
        onClick: handleNo,
      },
    ],
  });
};

export default handleConfirm;
