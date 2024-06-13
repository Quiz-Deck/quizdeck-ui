import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import Button from "components/button/buttons";
import errorHandler from "handlers/errorHandler";
import { useDeleteSingleDeckMutation } from "../../features/api/deck/deckApi";

interface Props {
  open: boolean;
  setClose: () => void;
  deck_id: string;
}

export const DeleteDeckModal = ({ open, setClose, deck_id }: Props) => {
  const navigate = useNavigate();
  const [deleteSingleDeck] = useDeleteSingleDeckMutation();

  const handleDelete = (id: string) => {
    deleteSingleDeck(id)
      .unwrap()
      .then(() => {
        setClose();
        navigate(-1);
      })
      .catch((err) => {
        errorHandler(err?.data || "Something went wrong", true);
      });
  };

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
            <h2 className="text-2xl font-bold">Delete Deck</h2>
          </div>

          <p className="text-center">
            Are you sure you want to delete this deck?
          </p>

          <div className="flex mt-4 justify-center items-center gap-5">
            <Button.Primary
              title={"Delete"}
              className="mt-4"
              onClick={() => {
                handleDelete(deck_id);
              }}
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
