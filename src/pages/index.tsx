import React from "react";

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      const url = input.value;
      if (url) {
        window.location.href = `/${url}`;
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1>∞ Infinite website ∞</h1>
        <br />
        <p>Explore any link and discover anything. This website is endless.</p>
      </div>
      <div>
        <form
          onSubmit={handleForm}
          className="border-4 border-black w-96 flex transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[5px_5px_black]"
        >
          <p className="py-4 pl-4 pr-2">/</p>
          <input
            ref={inputRef}
            className="w-full bg-transparent outline-none"
            type="search"
            placeholder="show-me-anything"
            autoFocus
            pattern={`[a-z][^\\\\\:\|\<\>\"\*\?]*$`}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 m-2 border-4 border-black hover:bg-white hover:text-black transition-all"
          >
            GO
          </button>
        </form>
      </div>
      <div></div>
    </main>
  );
}
