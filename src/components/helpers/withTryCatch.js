import { toast } from "react-toastify";

const withTryCatch = async (tryCode, catchCode = null, finallyCode = null) => {
  try {
    await tryCode();
  } catch (ex) {
    if (catchCode) catchCode(ex);
    else {
      toast.error(ex.message);
      console.log(ex);
    }
  } finally {
    if (finallyCode) finallyCode();
  }
};

export default withTryCatch;
