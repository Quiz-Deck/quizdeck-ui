import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Pagination = ({ data, route }) => {
  const navigate = useNavigate();
  let params = useParams();
  const [page, setPage] = useState(params.page);

  useEffect(() => {
    setPage(params.page);
  }, [params.page]);

  let last_page = data && data.last_page;
  let first_page = 1;
  let current_page = data && data.current_page;
  return (
    <div className=" flex justify-between items-center pt-6 px-3 sm:px-14 text-gray-500 sm:text-black text-base font-bold">
      {data && (
        <p>
          Page {current_page} of {last_page}
        </p>
      )}

      {data && data.last_page !== 1 && (
        <div className="flex gap-8 ">
          <button
            className=" bg-gray-500 p-1 rounded-sm sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() =>
              navigate(
                `/${route}/${page > first_page ? Number(page) - 1 : page}`
              )
            }
          >
            Prev
          </button>
          <button
            className=" bg-gray-500 rounded-sm p-1 sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() =>
              navigate(
                `/${route}/${page < last_page ? Number(page) + 1 : page}`
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
