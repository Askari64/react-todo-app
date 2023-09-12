import { useState, useEffect } from "react";

function Enlist() {
  const [listing, setListing] = useState("");
  const [items, setItems] = useState<{ key: string; value: string | null }[]>(
    []
  );
  const [clicked, setClicked] = useState(false);

  const addToLocalStorage = () => {
    if (listing == "") {
      console.log("nothing entered");
      return;
    }
    const randomKey = self.crypto.randomUUID();
    console.log(randomKey);

    localStorage.setItem(randomKey, listing);
    console.log(localStorage);
    setClicked(!clicked);
    setListing("");
  };

  const deleteFromLocalStorage = (_key: any) => {
    localStorage.removeItem(_key);
    setClicked(!clicked);
  };

  const updateLocalStorage = (_key: any, newValue: string) => {
    localStorage.setItem(_key, newValue);

    setClicked(!clicked);
  };

  // useEffect hook to update the items state whenever localStorage changes
  useEffect(() => {
    // get all the keys from localStorage
    const keys = Object.keys(localStorage);
    // map each key to an object with key and value properties
    const mappedItems = keys.map((key) => ({
      key: key,
      value: localStorage.getItem(key),
    }));
    // update the items state with the mapped items
    setItems(mappedItems);
  }, [localStorage, clicked]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20 pb-4 px-4 sm:px-0">
      <div className="w-full max-w-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">Todo Item:</label>
        <div className="flex items-center">
          <input
            aria-label="Todo"
            type="text"
            value={listing}
            onChange={(e) => {
              setListing(e.target.value); // Update input value in state
            }}
            className="shadow appearance-none border rounded py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow mr-4"
          />
          <button 
            type="button" 
            onClick={addToLocalStorage}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-4 overflow-auto max-h-[calc(100vh-12rem)] scroll-smooth">
          {items.map((item) => (
            <li key={item.key} className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-lg font-semibold truncate text-black">{item.value}</h3>
              <div className="mt-2 space-x-2">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                  onClick={() => {
                    const newValue = prompt("Update your todo", item.value ?? "");
                    if (newValue !== null) {
                      updateLocalStorage(item.key, newValue);
                    }
                  }}
                >
                  Update
                </button>
                <button
                  type="button" 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  onClick={() => deleteFromLocalStorage(item.key)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Enlist;