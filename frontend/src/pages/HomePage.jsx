import React from "react";

const HomePage = () => {
  const menu = ["other", "web", "nature", "react", "ai"];
  return (
    <header className="h-screen">
      <div className="h-[90vh] leading-loose text-white flex flex-col justify-center items-center bg-[#020024] bg-[linear-gradient(180deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(14,23,26,1)_100%)]">
        <h1 className="text-4xl font-sekuya fade-up">DeepWrite</h1>
        <p className="text-xl font-light font-geom fade-up">
          smart writing for smarter minds
        </p>
      </div>

      <section className="bg-linear-to-b from-[#020024] to-[#0d1b3c] py-10">
  <h1 className="text-center text-3xl text-white mb-6">All Blogs</h1>

  {/* Buttons */}
  <div className="flex justify-center items-center flex-wrap gap-3 mb-8">
    {menu.map((m, i) => (
      <button
        key={i}
        className="p-2 w-24 bg-[#0d1b3c] text-white rounded-2xl hover:bg-[#141f4d]"
      >
        {m}
      </button>
    ))}
  </div>

  {/* Blog Card */}
  <div className="flex justify-center gap-1.5 p-2.5">
    <div className="p-6 bg-[#fef9f1] border-2 border-black max-w-lg w-full rounded-lg shadow-lg fade-up">
      <h2 className="text-xl font-bold mb-4">Blog Title</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At fugit
        autem doloremque nulla, saepe quasi nostrum sequi quia distinctio
        architecto, beatae quae debitis deserunt numquam.
      </p>
    </div>
    <div className="p-6 bg-[#fef9f1] border-2 border-black max-w-lg w-full rounded-lg shadow-lg fade-up">
      <h2 className="text-xl font-bold mb-4">Blog Title</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At fugit
        autem doloremque nulla, saepe quasi nostrum sequi quia distinctio
        architecto, beatae quae debitis deserunt numquam.
      </p>
    </div>
    <div className="p-6 bg-[#fef9f1] border-2 border-black max-w-lg w-full rounded-lg shadow-lg fade-up">
      <h2 className="text-xl font-bold mb-4">Blog Title</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At fugit
        autem doloremque nulla, saepe quasi nostrum sequi quia distinctio
        architecto, beatae quae debitis deserunt numquam.
      </p>
    </div>
  </div>
</section>

    </header>
  );
};

export default HomePage;
