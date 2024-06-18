import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "./index";
import Input from "components/input/Input";
import { SelectInput } from "components/input/select";
import Button from "components/button/buttons";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import {
  SingleDeck,
  CreateDeckRequest,
} from "features/api/deck/deckSliceTypes";
import { useEditDeckMutation } from "features/api/deck/deckApi";
import { deckActions } from "features/store/deckSlice";

interface Props {
  open: boolean;
  setClose: () => void;
  deck?: SingleDeck;
}

export const EditDeckModal = ({ open, setClose, deck }: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [editDeck, { isLoading }] = useEditDeckMutation();
  const [data, setData] = useState<CreateDeckRequest>({
    title: "",
    description: "",
    type: "",
    status: "",
    timer: 0,
  });

  useEffect(() => {
    if (deck) {
      const min_timer = Math.floor(Number(deck?.timer) / 60);
      setData({
        title: deck?.title,
        description: deck?.description,
        type: deck?.type,
        status: deck?.status,
        timer: min_timer,
      });
    }
  }, [deck]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "timer") {
      const timer = parseInt(value, 10);
      setData({ ...data, [name]: timer });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = () => {
    const timer_to_seconds = data.timer && Number(data.timer * 60);
    const new_data = { ...data, timer: timer_to_seconds };
    editDeck({
      deckId: id,
      payload: new_data,
    })
      .unwrap()
      .then((res: any) => {
        dispatch(deckActions.editADeck(res?.data));
        successHandler(res, true);
        setClose();
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">Edit deck</h2>
          </div>
          <Input.Label
            title={"Quiz Name"}
            name="title"
            placeholder={"Quiz Name"}
            defaultValue={data?.title}
            className="rounded-md mb-5 bg-[#FAFAFF]"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <Input.Textarea
            title={"Quiz Description"}
            name="description"
            placeholder={"Add a description..."}
            defaultValue={data?.description}
            className="rounded-md mb-5 min-h-[100px] bg-[#FAFAFF]"
            autoComplete="off"
            minLength={12}
            onChange={(e: any) => handleChange(e)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <SelectInput
              label={"Quiz Type"}
              name={"type"}
              value={data?.type}
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
              value={data?.status}
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
            defaultValue={data?.timer}
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <div className="flex mt-4 items-center gap-5">
            <Button.Primary
              title={"Edit Deck"}
              className="mt-4"
              // disabled={false}
              loading={isLoading}
              onClick={handleSubmit}
            />
            <Button.Secondary
              title={"Cancel"}
              className="mt-4"
              onClick={() => setClose()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
