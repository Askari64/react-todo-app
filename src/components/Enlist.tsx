import { useState , useEffect} from "react";

function Enlist() {
  const [listing, setListing] = useState("");
  const [items, setItems] = useState<{key: string; value: string | null}[]> ([]);
  const [clicked, setClicked] = useState(false);

  const addToLocalStorage = () => {

    if( listing == '') {
      console.log('nothing entered')
      return
    }
    const randomKey = self.crypto.randomUUID();
    console.log(randomKey);

    localStorage.setItem(randomKey, listing);
    console.log(localStorage);
    setClicked(!clicked)
    setListing('');
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
  <>
    <label>Task:</label>
    <input
      aria-label="Task"
      type="text"
      value={listing}
      onChange={(e) => {
        setListing(e.target.value); // Update input value in state
      }}
    />
    <button type="button" onClick={addToLocalStorage}>
      Add
    </button>
    <ul>
      {items.map((item) => (
        <li key={item.key}>{item.value}</li>
      ))}
    </ul>
  </>
);
}

export default Enlist;