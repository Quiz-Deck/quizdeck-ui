import React from "react";
import { Disclosure } from "@headlessui/react";
import { EnvelopeIcon } from '@heroicons/react/24/outline';

// const categories = [
//   { name: "Home", href: "#" },
//   { name: "About Us", href: "#" },
//   { name: "Services", href: "#" },
//   { name: "Contact Us", href: "#" },
// ];

// const links = [
//   { name: "Home", href: "#" },
//   { name: "About Us", href: "#" },
//   { name: "Services", href: "#" },
//   { name: "Contact Us", href: "#" },
// ];

export default function FooterCommon() {
  const currentYear = new Date().getFullYear();
  return (
    <Disclosure as="nav" className="bg-primary text-white py-8">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex px-2 lg:px-0">
                <div>
                  <div className="block h-8 w-auto text-white text-2xl font-bold">
                    Quiryfy
                  </div>
                  <div className='flex items-center gap-2 mt-3'>
                    <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                    <a href="mailto:hello@quiryfy.com">hello@quiryfy.com</a>
                  </div>
                  
                </div>
              </div>
              <div>
                <p>©️ Quirify {currentYear}</p>
              </div>

              {/* <div className="lg:ml-4 lg:items-center flex flex-col sm:flex-row gap-8">
                <div className="block">
                  <h3 className="mb-4">Categories</h3>
                  {categories.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block font-medium text-white hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="block">
                  <h3 className="mb-4">Useful Links</h3>
                  {links.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block font-medium text-white hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="block">
                  <h3 className="mb-4">Stay Connected</h3>
                  {links.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block font-medium text-white hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
