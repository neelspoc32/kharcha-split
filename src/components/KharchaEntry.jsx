import { Fragment } from "react";

export default function KharchaEntry({
  entry,
  index,
  handleEntryChange,
  tabNewEntry,
  handleTagNameSanitize,
  setIsSuggestionListVisible,
  setFocusedEntryIndex,
  setSuggestionType,
}) {
  // function onChange(e) {
  //   const { name, value } = e.target;
  //   handleEntryChange(index, { ...entry, [name]: value });
  // }

  function onChange(e) {
    const { name, value } = e.target;

    const updatedValue =
      name === "tagName" && value.trim() && !value.startsWith("#")
        ? "#" + value.trim()
        : value;
    console.log("updated entry from karchaentry");
    handleEntryChange(index, { ...entry, [name]: updatedValue });
  }

  function handleTabKey(event) {
    if (event.key == "Tab") {
      tabNewEntry();
    }
  }

  return (
    <>
      <div className="pt-4 suggestion-group entry">
        <input
          type="text"
          name="tagName"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.tagName}
          onChange={onChange}
          onFocus={() => {
            setSuggestionType("tags");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => handleTagNameSanitize(index,e, "tagName")}
          placeholder="Tag Name"
          autoComplete="off"
          required
        ></input>
      </div>

      <div className="pt-4 entry">
        <input
          type="text"
          name="kharchaName"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.kharchaName}
          onClick={(e) => e.stopPropagation()}
          onChange={onChange}
          onBlur={(e) => handleTagNameSanitize(index,e, "kharchaName")}
          placeholder="Kharcha Name"
          autoComplete="off"
          required
        ></input>
      </div>

      <div className="pt-4 suggestion-group entry">
        <input
          type="text"
          name="payer"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.payer}
          onClick={(e) => e.stopPropagation()}
          onFocus={() => {
            setSuggestionType("payers");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onBlur={(e) => handleTagNameSanitize(index,e, "payer")}
          onChange={onChange}
          placeholder="Paid By"
          autoComplete="off"
          required
        ></input>
      </div>

      <div className="pt-4 entry">
        <input
          type="number"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          name="amount"
          value={entry.amount}
          onClick={(e) => e.stopPropagation()}
          onChange={onChange}
          onBlur={(e) => handleTagNameSanitize(index,e, "amount")}
          onKeyDown={handleTabKey}
          placeholder="Amt"
          autoComplete="off"
          required
        ></input>
      </div>
    </>
  );
}
