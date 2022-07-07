const withTryCatch = async (tryCode, catchCode = null, finallyCode = null) => {
  try {
    await tryCode();
  } catch (ex) {
    if (catchCode) catchCode(ex);
    else console.log(ex);
  } finally {
    if (finallyCode) finallyCode();
  }
};

export default withTryCatch;
