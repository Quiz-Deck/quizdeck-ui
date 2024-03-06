import React from "react";
import { ReactComponent as Create } from "../../../assets/icons/create-quiz.svg";
import { ReactComponent as Take } from "../../../assets/icons/take-quiz.svg";
import { ReactComponent as Publish } from "../../../assets/icons/publish-quiz.svg";

const people = [
  {
    name: "Create Quiz",
    description:
      "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts",
    imageUrl: Create,
  },
  {
    name: "Take Quiz",
    description:
      "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
    imageUrl: Take,
  },
  {
    name: "Publish Quiz",
    description:
      "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization ",
    imageUrl: Publish,
  },
];

export default function Services() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-20">
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Starting learning for free with a wide range of free online quizes
            covering
          </p>
        </div>

        <div className="pt-16">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-20 sm:gap-6">
            {people.map((item, index) => (
              <li
                key={index}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow-xl divide-y divide-gray-200"
              >
                <div className="flex-1 relative flex flex-col p-8">
                  <item.imageUrl className="w-32 h-32 absolute top-[-60px] inset-x-0 flex-shrink-0 mx-auto" />
                  <h3 className="mt-10 mb-8 text-primaryDark text-2xl">
                    {item.name}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">description</dt>
                    <dd className="text-gray-500 text-base">
                      {item.description}
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
