import React from "react";

const navigation = [
  { name: "Explore", href: "/dashboard/explore" },
  { name: "My Library", href: "/dashboard/my-library" },
  { name: "Report", href: "#" },
  { name: "Profile", href: "#" },
  { name: "Notification", href: "#" },
];

export default function SidenavDashboard() {
  return (
    <div className="max-w-[300px] w-full h-screen hidden sm:block sm:fixed">
      <div className="h-full">
        <div className="flex w-full px-2 lg:px-0 h-14">
          <div className="flex-shrink-0 flex w-full items-center justify-center py-3">
            <div className="block lg:hidden h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
            <div className="hidden lg:block h-8 w-auto text-primary text-3xl font-bold">
              QuizDeck
            </div>
          </div>
        </div>

        <div className="bg-[#126CD6] sm:pl-4 lg:pl-8 h-full rounded-tr-3xl">
          <div className="pt-[20%]">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-white py-4 px-5 hover:rounded-l-3xl hover:bg-white hover:text-secondary block"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
