const Pagination = ({ handlePagination, pages, currentPage, numberOfPage }) => {
  return (
    <div className="flex justify-center mt-12">
      {/* prev btn */}
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:cursor-not-allowed btn btn-sm btn-outline hover:bg-[#F43F5E] border-[#F43F5E] hover:border-[#F43F5E] mr-8"
      >
        Prev
      </button>

      {/* BUTTON NUMBERS */}
      {pages.map((btnNum) => (
        <button
          onClick={() => handlePagination(btnNum)}
          key={btnNum}
          className={`${
            currentPage === btnNum ? "border-b-4 border-green-200" : ""
          } px-6 py-1 mx-1 transition-colors rounded-md duration-300 transform sm:inline hover:bg-green-200 font-bold`}
        >
          {btnNum}
        </button>
      ))}

      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === numberOfPage}
        className="disabled:cursor-not-allowed btn btn-sm btn-outline hover:bg-[#F43F5E] border-[#F43F5E] hover:border-[#F43F5E] sm:inline ml-8"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
