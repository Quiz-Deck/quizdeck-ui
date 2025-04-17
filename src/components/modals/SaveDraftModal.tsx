import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";
import { ReactComponent as Close } from "assets/icons/close.svg";
import Badge from "assets/icons/badge_success.png";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const SaveDraftModal = ({ open, setClose }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard/my-library");
  };

  return (
    <Modal open={open} width={"864px"}>
      <div className="max-w-[864px] mx-auto">
        <div className="flex items-center justify-center bg-primary relative rounded-[1rem] px-[2.5rem] py-[5rem] w-full h-full min-h-[60vh]">
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>

          <div className="flex flex-col items-center justify-center gap-8">
            <img src={Badge} alt="badge" className="h-[130px] w-[130px]" />
            <p className="text-white text-[40px]">Saved as draft</p>
            <Button.Secondary
              title={"Go to Library"}
              className="px-8 outline-none"
              style={{ borderRadius: "50px" }}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
