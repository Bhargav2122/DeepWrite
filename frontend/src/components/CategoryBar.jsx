
const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
   
    const menu = ["other", "web", "nature", "react", "ai"];

 
  return (
    <div className="flex justify-center items-center flex-wrap gap-3 mb-8">
    {menu.map((m, i) => (
      <button
      key={i}
           onClick={() => onSelectCategory(m)}
          className={`p-2 w-24 rounded-2xl transition
            ${
              selectedCategory === m
                ? "bg-[#1f2f6d] text-white"
                : "bg-[#0d1b3c] text-gray-300 hover:bg-[#141f4d]"
            }
          `}
     >
        {m}
      </button>
    ))}
    </div>
  )
}

export default CategoryBar