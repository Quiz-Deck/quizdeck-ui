import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "./index";
import Input from "components/input/Input";
import { SelectInput } from "components/input/select";
import SelectCategory from "components/input/SelectCategory";
import Button from "components/button/buttons";
import { ReactComponent as Close } from "assets/icons/close.svg";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import {
  SingleDeck,
  CreateDeckRequest,
} from "features/api/deck/deckSliceTypes";
import { useEditDeckMutation } from "features/api/deck/deckApi";
import { deckActions } from "features/store/deckSlice";
import { useAddQuestionMutation } from "features/api/question/questionApi";

interface Props {
  open: boolean;
  setClose: () => void;
  deck?: SingleDeck;
  deckQuestions: any;
}

export const EditDeckModal = ({
  open,
  setClose,
  deck,
  deckQuestions,
}: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addQuestion] = useAddQuestionMutation();

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
    const new_data = { ...data, status: "PUBLISHED", timer: timer_to_seconds };
    editDeck({
      deckId: id,
      payload: new_data,
    })
      .unwrap()
      .then((res: any) => {
        dispatch(deckActions.editADeck(res?.data));
        addQuizQuestions(deckQuestions);
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

  const addQuizQuestions = (questionSetsArray: any[]) => {
    addQuestion({
      deckId: id,
      payload: [...questionSetsArray],
    })
      .unwrap()
      .then((res: any) => {
        console.log("ddsd");

        dispatch(deckActions.addADeckQuestion(res?.data));
        successHandler(res, true);
        setClose();
      })
      .catch((err) => {
        console.log(err);
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
          <div className="pb-6 border-b border-primary300 mb-10 relative">
            <h2 className="text-[2rem] text-primary font-bold">Quiz Preview</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Sed libero</p>

            <button
              type="button"
              onClick={() => setClose()}
              className="absolute right-3 top-4 outline-none"
            >
              <Close className="h-[2rem] w-[2rem] " />
            </button>
          </div>

          <Input.Label
            title={"Title of Quiz"}
            name="title"
            placeholder={"Quiz Name"}
            // defaultValue={data?.title}
            value={data?.title}
            className="rounded-[20px] mb-5 bg-[#FAFAFF]"
            autoComplete="off"
            onChange={(e: any) => handleChange(e)}
          />
          <Input.Textarea
            title={"Description"}
            name="description"
            placeholder={"Add a description..."}
            defaultValue={data?.description}
            className="rounded-[20px] mb-5 min-h-[100px] bg-[#FAFAFF]"
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
              className="rounded-[20px] bg-[#FAFAFF]"
            >
              <option>Select Quiz Type</option>
              <option value={"PRIVATE"}>PRIVATE</option>
              <option value={"PUBLIC"}>PUBLIC</option>
            </SelectInput>

            <Input.Number
              title={"Total Time Duration"}
              name="timer"
              placeholder={"How many minutes should this test last for?"}
              className="rounded-[20px] mb-5 bg-[#FAFAFF]"
              defaultValue={data?.timer}
              autoComplete="off"
              onChange={(e: any) => handleChange(e)}
            />
          </div>

          <SelectInput
            label={"Quiz Status"}
            name={"status"}
            value={data?.status}
            onChange={(e: any) => handleChange(e)}
            className="rounded-[20px] bg-[#FAFAFF]"
          >
            <option>Select Quiz Status</option>
            {/* <option value={"DRAFT"}>DRAFT</option> */}
            <option value={"PUBLISHED"}>PUBLISHED</option>
          </SelectInput>

          <SelectCategory />

          <div className="flex mt-10 items-center justify-center gap-5">
            <Button.Primary
              title={"Publish"}
              className="px-8 outline-none"
              style={{ borderRadius: "50px" }}
              loading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
