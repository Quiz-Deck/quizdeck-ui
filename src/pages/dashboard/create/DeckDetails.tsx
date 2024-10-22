import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import { SelectInput } from "components/input/select";
import Button from "../../../components/button/buttons";
import successHandler from "handlers/successHandler";
import errorHandler from "handlers/errorHandler";
import { useCreateDeckMutation } from "../../../features/api/deck/deckApi";

// Explicitly import the types for JSX
type CreateQuizProps = {};

const DeckDetails: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    type: "PRIVATE",
    status: "DRAFT",
    timer: 0, //Optional
    deckGuests: [], //Optional
  });

  const [createDeck, { isLoading }] = useCreateDeckMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const timer_to_seconds = Number(data.timer * 60);
    const new_data = { ...data, timer: timer_to_seconds };

    createDeck(new_data)
      .unwrap()
      .then((res: any) => {
        successHandler(res, true);
        navigate(`/deck/create/${res?.data?._id}`);
      })
      .catch((err) => {
        errorHandler(err?.data, true);
      });
  };

  return (
    <div>
      <Input.Label
        title={"Title of Quiz"}
        name="title"
        placeholder={"Enter title of quiz"}
        className="mb-5 bg-[#FAFAFF]"
        autoComplete="off"
        onChange={(e: any) => handleChange(e)}
      />
      <Input.Textarea
        title={"Description"}
        name="description"
        placeholder={"Describe your quiz"}
        className="mb-5 min-h-[60px] bg-[#FAFAFF]"
        autoComplete="off"
        minLength={5}
        onChange={(e: any) => handleChange(e)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <Input.Number
          title={"Total Time Duration (optional)"}
          name="timer"
          placeholder={"How many minutes should this test last for?"}
          className="bg-[#FAFAFF] mt-1"
          autoComplete="off"
          onChange={(e: any) => handleChange(e)}
        />

        <SelectInput
          label={"Type"}
          name={"type"}
          onChange={(e: any) => handleChange(e)}
          className="bg-[#FAFAFF]"
        >
          <option>Select Quiz Type</option>
          <option value={"PRIVATE"}>PRIVATE</option>
          <option value={"PUBLIC"}>PUBLIC</option>
        </SelectInput>
      </div>

      <div className="mt-4 flex justify-center">
        <Button.Primary
          title={"Create Deck"}
          className="px-5"
          style={{ borderRadius: "30px" }}
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default DeckDetails;
