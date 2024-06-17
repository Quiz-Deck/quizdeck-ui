import React from "react";

interface Props {
  data: any;
  page: number;
  setPage: (e: number) => void;
}

export const PaginationNoRoute = ({ data, page, setPage }: Props) => {
  let last_page = data && data.totalPages;
  let first_page = 1;
  let current_page = data && data.currPage;

  return (
    <div className=" flex justify-between items-center pt-6 px-3 sm:px-4 text-gray-500 sm:text-black text-base font-bold">
      {data && (
        <p>
          Page {current_page} of {last_page}
        </p>
      )}

      {data && last_page !== 1 && (
        <div className="flex gap-8 ">
          <button
            className=" bg-gray-500 p-1 rounded-sm sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() => {
              const newpage = page > first_page ? Number(page) - 1 : page;
              setPage(newpage);
            }}
          >
            Prev
          </button>
          <button
            className=" bg-gray-500 rounded-sm p-1 sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() => {
              const newpage = page < last_page ? Number(page) + 1 : page;
              setPage(newpage);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
