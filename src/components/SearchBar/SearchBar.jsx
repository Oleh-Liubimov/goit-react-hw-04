/* eslint-disable react/prop-types */
import toast, { Toaster } from "react-hot-toast";


const notification = () => toast("Please enter some request")

export default function SearchBar({ onSearch,  setWord }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.search.value;

    setWord(query)

    if (query.trim() === "") {
      notification();
      return;
    }
    onSearch(query);
    form.reset();
  }

  return (
    <header>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-3 bg-emerald-400 p-3 font-serif"
      >
        <input
          type="text"
          autoComplete="off"
          name="search"
          autoFocus
          placeholder="Search..."
          className="outline-none p-2 border-inherit rounded-md w-1/3 "
        />
        <button
          type="submit"
          className="p-2 bg-blue-400 rounded-md text-black hover:bg-blue-500 transition"
        >
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
}