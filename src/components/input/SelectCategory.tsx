import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "features/api/category/categoryApi";
import { useCreateCategoryMutation } from "features/api/category/categoryApi";

const SelectCategory = () => {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const { data: categories } = useGetCategoriesQuery("");
  const [createCategory, { isLoading: loading }] = useCreateCategoryMutation();

  const handleInputChange = (e: any) => {
    setNewCategory(e.target.value);
    // setErrorMessage("");
  };

  const handleAddCategory = () => {
    const isCategoryExist =
      categories &&
      categories?.data?.filter(
        (e) => e?.toLowerCase() === newCategory?.toLowerCase()
      );

    if (isCategoryExist?.length === 0) {
      createCategory({
        title: newCategory,
      })
        .unwrap()
        .then((res: any) => {
          console.log("res", res);
          setNewCategory("");
          // dispatch(deckActions.editADeck(res?.data));
        })
        .catch((err) => {
          // errorHandler(err?.data || "Something went wrong", true);
        });
    }
  };

  return (
    <div>
      <div>
        <div className="w-full flex items-center">
          <label className="block text-sm font-medium text-[#151515]">
            Category
          </label>
        </div>

        <main
          className={`w-full flex items-center justify-between gap-[0.5rem]`}
        >
          <div
            className={
              "mt-2 block pl-3 pr-10 w-full text-base focus:ring focus:ring-primary focus:border-primary focus:outline-none sm:text-lg h-[50px] px-4 py-2 mb-4 bg-[#FAFAFF] border border-gray-300 rounded-[20px] capitalize"
            }
            onClick={() => setShowModal(!showModal)}
          >
            {selectedCategory ? (
              <p>{selectedCategory}</p>
            ) : (
              <span>Add Quiz Category</span>
            )}
          </div>
        </main>

        {/* List of created categories */}
        {showModal && (
          <div className="py-2 px-2 bg-white rounded-md border border-primary300">
            {/* Input to add new category */}
            <form className="w-full flex justify-between gap-3 mb-1">
              <input
                id="new-category"
                type="text"
                value={newCategory}
                onChange={handleInputChange}
                placeholder="Type a new category"
                style={{ marginRight: "10px" }}
                className="bg-[#F2F2F3] py-1 px-3 text-primary w-full"
              />
              <button type="button" onClick={handleAddCategory}>
                {loading ? "Adding..." : "Add Category"}
              </button>
            </form>
            <ul className="mb-3">
              {categories?.data &&
                categories?.data?.map((category: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowModal(false);
                    }}
                    className="capitalize px-3 py-2 cursor-pointer"
                  >
                    {category}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;
