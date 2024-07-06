import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";

interface Props {
  open: boolean;
  setClose: () => void;
  data: any;
}

export const StartTestModal = ({ open, setClose, data }: Props) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-xl mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
        >
          <div className="flex flex-col justify-center items-center mb-8">
            <h2 className="text-2xl font-bold">Start Quiz</h2>
            <p className='text-grey-500 text-sm'>Do not refresh this page, you will loose all your progress</p>
          </div>

          <p className="font-semibold text-left text-lg mb-4">
            Title: {data?.title}
          </p>

          <p className="text-left mb-2">
            You are about to start this quiz, It contains{" "}
            <b>{data?.questions?.length}</b> questions.
          </p>
          <p className="text-left mb-3">
            {data?.timer > 0
              ? `The time allocated for this quiz is ${Math.floor(
                  Number(data?.timer) / 60
                )} minutes, so use your time wisely. Try to attempt all questions within the time!`
              : "There is no timer for this quiz, so take your time to answer these questions."}
          </p>
          <p className="text-left mb-1">
            Click on <b>"Start"</b> button to begin this quiz.
          </p>

          <div className="flex mt-6 justify-between items-center gap-5">
            <Button.Primary
              title={"Close"}
              className="mt-4 px-6"
              onClick={() => {
                setClose();
                navigate(-1);
              }}
            />
            <Button.Secondary
              title={"Start"}
              className="mt-4 px-6"
              onClick={() => setClose()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
