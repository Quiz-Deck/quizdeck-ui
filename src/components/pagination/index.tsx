import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Props {
  data: any;
  route: string;
}
const Pagination = ({ data, route }: Props) => {
  const navigate = useNavigate();
  let params = useParams();
  const [page, setPage] = useState<number>(Number(params?.page) || 1);

  useEffect(() => {
    if (params?.page) {
      setPage(Number(params?.page));
    }
  }, [params.page]);

  let last_page = data && data.totalPages;
  let first_page = 1;
  let current_page = data && data.currPage;

  console.log("data", data);
  console.log("current_page", current_page);
  console.log("last_page", last_page);
  
  return (
    <div className="flex justify-between items-center py-6 text-gray-500 sm:text-black text-base font-bold">
      {data && (
        <p>
          Page {current_page} of {last_page}
        </p>
      )}

      {data && data.totalPages !== 1 && (
        <div className="flex gap-8 ">
          <button
            className=" bg-gray-500 p-1 rounded-sm sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() =>
              navigate(
                `${route}?page=${page > first_page ? Number(page) - 1 : page}`
              )
            }
          >
            Prev
          </button>
          <button
            className=" bg-gray-500 rounded-sm p-1 sm:p-0 sm:bg-inherit text-white sm:text-black"
            onClick={() =>
              navigate(
                `${route}?page=${page < last_page ? Number(page) + 1 : page}`
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
