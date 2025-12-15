import React from 'react'

const Pagination = ({ page, totalPages, OnPage }) => {
    if(totalPages <=1) return null;
    const pages = Array.from({ length: totalPages}, (_,i) => i + 1);
  return (
<div className="flex justify-center mt-8">
  <div className="flex flex-wrap gap-2 max-w-full justify-center">
    {pages.map((p) => (
      <button
        key={p}
        onClick={() => OnPage(p)}
        className={`min-w-10 px-3 py-2 text-sm rounded-md transition
          ${
            p === page
              ? "bg-indigo-500 text-white shadow"
              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
          }`}
      >
        {p}
      </button>
    ))}
  </div>
</div>

  )
}

export default Pagination