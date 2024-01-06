import React, { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const QuizDetails: React.FC<CreateQuizProps> = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: [value] });
  };
  return (
    <div className="p-5 border w-full">
      <Input.Label
        title={"Quiz Name"}
        name="email"
        placeholder={"Quiz Name"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz Description"}
        name="email"
        placeholder={"Quiz Description"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz Category"}
        name="email"
        placeholder={"Quiz Category"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz Cover"}
        name="email"
        placeholder={"Quiz Cover"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />

      <Button.Primary title={"Save"} className="w-full mt-4" />
    </div>
  );
};

export default QuizDetails;
