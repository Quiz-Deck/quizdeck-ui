import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const StartTestModal = ({ open, setClose }: Props) => {
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
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-2xl font-bold">Start Test</h2>
          </div>

          <p className="text-center">
            You are about to start this test, It contains x number of questions.
          </p>
          <p className="text-center">
            There is no timer/the time is x so use your time wisely
          </p>

          <p className="text-center">
            Click on "Start" button to begin this quiz.
          </p>

          <div className="flex mt-4 justify-center items-center gap-5">
            <Button.Primary
              title={"Close"}
              className="mt-4"
              onClick={() => {
                setClose();
                navigate(-1);
              }}
            />
            <Button.Secondary
              title={"Start"}
              className="mt-4"
              onClick={() => setClose()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
