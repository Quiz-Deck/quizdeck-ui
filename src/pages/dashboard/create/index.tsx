import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import QuizNavbar from "./Navbar";
// import QuizDetails from "./Details";
// import MultipleChoice from "./MultipleChoice";
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
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold">Create a new deck</h2>
        <Button.Primary title={"Create"} className="mb-4" />
      </div>

      <div>
        <Input.Label
          title={"Quiz Name"}
          name="title"
          placeholder={"Quiz Name"}
          className="rounded-md mb-5"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Input.Textarea
          title={"Quiz Description"}
          name="description"
          placeholder={"Add a description..."}
          className="rounded-md mb-5 min-h-[100px]"
          autoComplete="off"
          minLength={12}
          onChange={(e: any) => handleChange(e)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
          <SelectInput
            label={"Quiz Type"}
            name={"type"}
            onChange={(e: any) => handleChange(e)}
            className="rounded-md"
          >
            <option>Select Quiz Type</option>
            <option value={"PRIVATE"}>PRIVATE</option>
            <option value={"PUBLIC"}>PUBLIC</option>
          </SelectInput>

          <SelectInput
            label={"Quiz Status"}
            name={"status"}
            onChange={(e: any) => handleChange(e)}
            className="rounded-md"
          >
            <option>Select Quiz Status</option>
            <option value={"DRAFT"}>DRAFT</option>
            <option value={"PUBLISHED"}>PUBLISHED</option>
          </SelectInput>
          {/* <Input.Label
            title={"Quiz Type"}
            name="type"
            placeholder={"Quiz Type"}
            className="rounded-md mb-5"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          /> */}

          {/* <Input.Label
            title={"Quiz Status"}
            name="status"
            placeholder={"Quiz Status"}
            className="rounded-md mb-5"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          /> */}
        </div>

        <Input.Number
          title={"Timer (optional)"}
          name="timer"
          placeholder={"How many minutes should this test last for?"}
          className="rounded-md mb-5"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />
        <Button.Primary
          title={"Create"}
          className="mt-4"
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateQuiz;
