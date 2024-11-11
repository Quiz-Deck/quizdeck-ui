import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Explore from "../pages/dashboard/explore/Explore";
import Question from "../pages/dashboard/explore/Question";
import MyLibrary from "../pages/dashboard/explore/MyLibrary";
import PublicDecks from 'pages/dashboard/explore/PublicDecks';
import NavbarDashboard from "../components/navigation/NavbarDashboard";
import SidenavDashboard from "../components/navigation/SidenavDashboard";
import { useCreateDeckMutation } from "features/api/deck/deckApi";
import { deleteSyncedData, getOfflineDecks } from "storage/indexedDBStorage";
import errorHandler from "handlers/errorHandler";

export default function AdminLayout() {

  const [createDeck, { isLoading }] = useCreateDeckMutation();

  const syncOfflineData = async () => {
    let decks = await getOfflineDecks();
    if (!decks) return;
    decks.map((deck) => {
      createDeck(deck)
        .unwrap()
        .then((res: any) => {
          deleteSyncedData(deck._id)
        })
        .catch((err) => {
          errorHandler(err?.data, true);
        });
    })

  }

  useEffect(() => {
    if (navigator.onLine) {
      syncOfflineData()
    }
  }, [navigator])



  return (
    <div className="relative">
      <SidenavDashboard />
      <div className="w-full xl:w-[95%] flex-auto sm:pl-[340px]">
        <NavbarDashboard />
        <div className="pr-8 mt-6">
          <Routes>
            <Route path="*" element={<Explore />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/my-library" element={<MyLibrary />} />
            <Route path="/public-decks" element={<PublicDecks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
