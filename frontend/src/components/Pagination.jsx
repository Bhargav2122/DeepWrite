import React from 'react'

const Pagination = ({ page, totalPages, OnPage }) => {
    if(totalPages <=1) return null;
    const pages = Array.from({ length: totalPages}, (_,i) => i + 1);
  return (
    <div>
        {pages.map((p) =>(
            <button key={p} onClick={() => OnPage(p)} className={p === page ? "active" : ""}>{p}</button>
        ))}
    </div>
  )
}

export default Pagination