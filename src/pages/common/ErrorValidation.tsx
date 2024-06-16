import React from "react";

interface Props {
  message: string;
}

export default function ErrorValidation({ message }: Props) {
  return <div className="text-red-500 text-xs">* {message}</div>;
}
