"use client";

export default function Home() {

    function handleClick() {
        alert("Dont do it again!");
    }


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <ol className="font-mono list-inside list-decimal text-lg/6 text-center sm:text-left">
              <h1 className="mb-2 tracking-[-.01em]">
                  Lets start!
              </h1>
          </ol>
          <button
              onClick={handleClick}
              className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
              Press me!
          </button>
      </main>
    </div>
  );
}
