import React from "react";

const Alert = ({ message }: { message: string }) => {
  return (
    <div
      className="bg-red-100 border border-red-200 text-red-500 p-2 rounded relative text-sm"
      role="alert"
    >
      <strong className="font-bold">Error : </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;
