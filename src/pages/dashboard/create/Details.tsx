import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/buttons";
import { useCreateDeckMutation } from "../../../features/api/deck/deckSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const QuizDetails: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
  });
  const [createDeck, { isLoading }] = useCreateDeckMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    createDeck(data)
      .unwrap()
      .then((res) => {
        // localStorage.setItem("user", JSON.stringify(res.data));
        // navigate("/auth/login");
        console.log("res", res);
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  return (
    <div className="p-5 border w-full">
      <Input.Label
        title={"Quiz Name"}
        name="title"
        placeholder={"Quiz Name"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz Description"}
        name="description"
        placeholder={"Quiz Description"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz TPYE"}
        name="type"
        placeholder={"Quiz TPYE"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Label
        title={"Quiz Status"}
        name="status"
        placeholder={"Quiz Status"}
        className="rounded-md mb-5"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />

      <Button.Primary
        title={"Save"}
        className="w-full mt-4"
        loading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default QuizDetails;
