import React, { useState } from "react";
import { Modal } from "./index";
import Button from "components/button/buttons";
import Input from "components/input/Input";
import Avatar from "assets/images/rectangle.jpg";
import UserImg from "assets/icons/add-user.svg";
import { ReactComponent as Close } from "assets/icons/close.svg";
import errorHandler from "handlers/errorHandler";
import successHandler from "handlers/successHandler";
import { DeckGuests } from "features/api/deck/deckSliceTypes";
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
    <Modal open={open} width={"864px"}>
      <div className="max-w-[864px] mx-auto">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2rem] py-[3.125rem]"
        >
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setClose()}
              className="absolute right-4 top-5 outline-none"
            >
              <Close className="h-[2rem] w-[2rem]" />
            </button>
            <div className="h-[92px] w-[92px] bg-[#E0D4FC] rounded-full flex items-center justify-center">
              <img
                src={UserImg}
                alt="UserImg"
                className="h-[48px] w-[48px] object-cover rounded-full"
              />
            </div>

            <div>
              <h2 className="text-[40px] mb-1 text-primary font-bold">
                Invite
              </h2>
              <p className="text-sm text-gray-500">
                Note: You can only share this deck with registered Quiryfy
                users.
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between gap-3 w-full">
            <div className="w-full">
              <Input.Label
                title={""}
                type="email"
                name="email"
                placeholder={"Enter user email"}
                className="rounded-md bg-[#FAFAFF] w-full"
                autoComplete="off"
                onChange={(e: any) => handleChange(e)}
              />
            </div>

            <Button.Primary
              title={"Invite"}
              loading={isLoading}
              disabled={input?.email === ""}
              className="min-w-[120px] h-[50px]"
              style={{ borderRadius: "50px" }}
              onClick={() => {
                handleInvite();
              }}
            />
          </div>

          <div>
            <h3 className="mb-4 font-semibold">People with access</h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="h-[32px] w-[32px] object-cover rounded-full"
                  />
                  <div>
                    <p className="text-sm">{data?.createdBy?.userName}</p>
                    <p className="text-xs">{data?.createdBy?.email}</p>
                  </div>
                </div>
                <p className="text-sm">Owner</p>
              </div>

              {data?.deckGuests?.length > 0 &&
                data?.deckGuests?.map((guest: DeckGuests) => (
                  <div
                    key={guest?._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={Avatar}
                        alt="Avatar"
                        className="h-[32px] w-[32px] object-cover rounded-full"
                      />
                      <div>
                        <p className="text-sm">{guest?.userName}</p>
                        <p className="text-xs">{guest?.email}</p>
                      </div>
                    </div>
                    <p className="text-sm">User</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
