import React, { useState } from "react";
import { Modal } from "./index";
import Button from "components/button/buttons";
import Input from "components/input/Input";
// import Avatar from "../../assets/images/rectangle.jpg";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { useInviteDeckUserMutation } from "features/api/deck/deckApi";

interface Props {
  open: boolean;
  setClose: () => void;
  data: any;
}

export const InviteDeckUserModal = ({ open, setClose, data }: Props) => {
  const [inviteDeckUser, { isLoading }] = useInviteDeckUserMutation();
  const [input, setInput] = useState({ email: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleInvite = () => {
    inviteDeckUser({ ...input, deckId: data?._id })
      .unwrap()
      .then((res: any) => {
        successHandler(res, true);
        setClose();
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
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2rem] py-[3.125rem]"
        >
          <div className="mb-6">
            <h2 className="text-2xl mb-1">
              Invite users to "{data?.title}" deck
            </h2>
            <p className="text-sm text-gray-500">
              Note: You can only share this deck with registered quizdeck users.
            </p>
          </div>

          <div className="mb-8">
            <Input.Label
              title={""}
              type="email"
              name="email"
              placeholder={"Enter user email"}
              className="rounded-md mb-5 bg-[#FAFAFF]"
              autoComplete="off"
              onChange={(e: any) => handleChange(e)}
            />
          </div>

          {/* <div>
            <h3 className="mb-4 font-semibold">People with access</h3>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[32px] w-[32px] object-cover rounded-full"
                  />
                  <p className="text-sm">Amy Abafor</p>
                </div>
                <p>Owner</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[32px] w-[32px] object-cover rounded-full"
                  />
                  <p className="text-sm">Amy Abafor</p>
                </div>
                <p>Collaborator</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[32px] w-[32px] object-cover rounded-full"
                  />
                  <p className="text-sm">Amy Abafor</p>
                </div>
                <p>User</p>
              </div>
            </div>
          </div> */}

          <div className="flex mt-8 justify-between items-center gap-5">
            <Button.Secondary
              title={"Cancel"}
              className="min-w-[120px]"
              onClick={() => setClose()}
            />
            <Button.Primary
              title={"Send"}
              loading={isLoading}
              className="min-w-[120px]"
              onClick={() => {
                handleInvite();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
