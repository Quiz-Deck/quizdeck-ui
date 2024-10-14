import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "components/button/buttons";
import Logo from "../../assets/icons/logo-black.png";
import { ReactComponent as LibraryOutline } from "../../assets/icons/document.svg";
import { ReactComponent as LibrarySolid } from "../../assets/icons/document-solid.svg";
import { ReactComponent as DiscoveryOutline } from "../../assets/icons/discovery.svg";
import { ReactComponent as DiscoverySolid } from "../../assets/icons/discovery-solid.svg";
import { ReactComponent as DashboardOutline } from "../../assets/icons/dashboard.svg";
import { ReactComponent as DashboardSolid } from "../../assets/icons/dashboard-solid.svg";
import { ReactComponent as LoginOutline } from "../../assets/icons/login.svg";
import { logOut } from "features/store/authReducer";

export default function SidenavDashboard() {
  const params = useParams();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard/explore",
      icon: DashboardOutline,
      iconActive: DashboardSolid,
      current: params["*"] && params["*"].includes("explore"),
    },
    {
      name: "My Library",
      href: "/dashboard/my-library",
      icon: LibraryOutline,
      iconActive: LibrarySolid,
      current: params["*"] && params["*"].includes("library"),
    },
    {
      name: "Explore",
      href: "/dashboard/public-decks",
      icon: DiscoveryOutline,
      iconActive: DiscoverySolid,
      current: params["*"] && params["*"].includes("explorer"),
    },
  ];
  return (
    <div className="max-w-[300px] w-full h-screen hidden sm:block sm:fixed">
      <div className="h-full">
        <div className="relative bg-[#F8F9FF] h-full">
          <div className="h-14 sm:pl-4 lg:pl-8">
            <div className="py-3 px-5">
              <div className="block lg:hidden w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[145px]" />
              </div>
              <div className="hidden lg:block w-auto text-primary text-3xl font-bold">
                <img src={Logo} alt="Logo" className="max-w-[145px]" />
              </div>
            </div>
          </div>

          <div className="pt-[20%] sm:pl-4 lg:pl-8 pr-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  item?.current
                    ? "text-primary border-l-4 border-primary"
                    : "text-text-neutral"
                } font-medium py-0 px-5 mb-10 hover:text-primary flex items-center gap-2`}
              >
                {item?.current ? (
                  <item.iconActive className="w-[1.4rem] h-[1.4rem]" />
                ) : (
                  <item.icon className="w-[1.5rem] h-[1.5rem]" />
                )}
                <span className="text-[1rem]">{item.name}</span>
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                handleLogout();
              }}
              className={`text-text-neutral hover:text-primary text-left font-medium py-3 px-5 mb-3 mt-24 flex items-center gap-2`}
            >
              <LoginOutline className="w-[1.5rem] h-[1.5rem]" />
              <span className="">Log Out</span>
            </button>
          </div>

          <div className="mt-24 absolute bottom-8 sm:pl-4 lg:pl-8 pr-4 w-full">
            <div className="bg-[#EADFFE] w-full py-5 rounded-[20px] ">
              <div className="mb-5 text-center">
                <p className="text-black text-[1rem] font-bold mb-1">
                  Win a badge
                </p>
                <p className="text-text-neutral text-sm">Lorem ipsum dolor </p>
              </div>
              <div className="flex items-center justify-center">
                <Button.Primary
                  title={"Create first quiz"}
                  className="px-5 mx-auto"
                  style={{ borderRadius: "50px" }}
                  // disabled={false}
                  // loading={isLoading}
                  // onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
