import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import { SelectInput } from "components/input/select";
import Button from "../../../components/button/buttons";
import { useCreateDeckMutation } from "../../../features/api/deck/deckSlice";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("details");
  const [data, setData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    timer: 0, //Optional
    deckGuests: [], //Optional
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
        navigate(`/deck/create/${res?.data?._id}`);
        console.log("res", res);
      })
      .catch((err) => {
        console.log("i am err", err);
        // errorHandler(err?.data?.message || "Something went wrong", true);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">Create a new deck</h2>
      </div>

      <div
        style={{
          boxShadow: "0px 2px 3px 0px #D6E4FD",
        }}
        className="border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
      >
        <Input.Label
          title={"Quiz Name"}
          name="title"
          placeholder={"Quiz Name"}
          className="rounded-md mb-5 bg-[#FAFAFF]"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Input.Textarea
          title={"Quiz Description"}
          name="description"
          placeholder={"Add a description..."}
          className="rounded-md mb-5 min-h-[100px] bg-[#FAFAFF]"
          autoComplete="off"
          minLength={12}
          onChange={(e: any) => handleChange(e)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
          <SelectInput
            label={"Quiz Type"}
            name={"type"}
            onChange={(e: any) => handleChange(e)}
            className="rounded-md bg-[#FAFAFF]"
          >
            <option>Select Quiz Type</option>
            <option value={"PRIVATE"}>PRIVATE</option>
            <option value={"PUBLIC"}>PUBLIC</option>
          </SelectInput>

          <SelectInput
            label={"Quiz Status"}
            name={"status"}
            onChange={(e: any) => handleChange(e)}
            className="rounded-md bg-[#FAFAFF]"
          >
            <option>Select Quiz Status</option>
            <option value={"DRAFT"}>DRAFT</option>
            <option value={"PUBLISHED"}>PUBLISHED</option>
          </SelectInput>
        </div>

        <Input.Number
          title={"Timer (optional)"}
          name="timer"
          placeholder={"How many minutes should this test last for?"}
          className="rounded-md mb-5 bg-[#FAFAFF]"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Button.Primary
          title={"Create Deck"}
          className="mt-4"
          // disabled={false}
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateQuiz;
