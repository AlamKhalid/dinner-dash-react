import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "200px auto",
};

const Loader = ({ loading }) => {
  return (
    <ClipLoader
      color="#000000"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Loader;
