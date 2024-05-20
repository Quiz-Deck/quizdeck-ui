import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { logOut } from "features/store/authReducer";

export default function SidenavDashboard() {
  const params = useParams();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const navigation = [
    {
      name: "Explore",
      href: "/dashboard/explore",
      current: params["*"] && params["*"].includes("explore"),
    },
    {
      name: "My Library",
      href: "/dashboard/my-library",
      current: params["*"] && params["*"].includes("library"),
    },
    // { name: "Report", href: "#" },
    // { name: "Profile", href: "#" },
    // { name: "Notification", href: "#" },
  ];
  return (
    <div className="max-w-[300px] w-full h-screen hidden sm:block sm:fixed">
      <div className="h-full">
        <div className="flex w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center justify-center py-3">
            <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
              Quiryfy
            </div>
            <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
              Quiryfy
            </div>
          </div>
        </div>

        <div className="bg-[#126CD6] sm:pl-4 lg:pl-8 h-full rounded-tr-3xl">
          <div className="pt-[20%]">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  item?.current ? "text-secondary bg-white" : "text-white"
                } font-medium py-3 px-5 mb-3 rounded-l-3xl hover:bg-[#1977e4] block`}
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                handleLogout();
                console.log("clicked");
              }}
              className={`text-white text-left font-medium py-3 px-5 mb-3 rounded-l-3xl hover:bg-[#1977e4] block w-full`}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
