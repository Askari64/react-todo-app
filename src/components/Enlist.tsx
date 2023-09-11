import { useState } from "react";

function Enlist() {
  const [listing, setListing] = useState("");

  const addToLocalStorage = () => {
    const randomKey = self.crypto.randomUUID();
    console.log(randomKey);

    localStorage.setItem(randomKey, listing);
    console.log(localStorage);
  };

  return (
    <>
      <label>Task:</label>
      <input
        aria-label="Task"
        type="text"
        onChange={(e) => {
          setListing(e.target.value); // Update input value in state
        }}
      />
      <button type="button" onClick={addToLocalStorage}>
        Add
      </button>
    </>
  );
}

export default Enlist;
