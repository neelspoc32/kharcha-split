import { Fragment } from "react";
import { useState } from "react";
import Section from "./Section";
export default function KharchaEntry({
  entry,
  index,
  handleEntryChange,
  tabNewEntry,
  sectionMode,
  handleTagNameSanitize,
  setIsSuggestionListVisible,
  setFocusedEntryIndex,
  setSuggestionType,
}) {
  // function onChange(e) {
  //   const { name, value } = e.target;
  //   handleEntryChange(index, { ...entry, [name]: value });
  // }
  const [validationMessage, setValidationMessage] = useState({
    kharchaName: "",
    tagName: "",
    payer: "",
    amount: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    let updatedValue = value;
    updatedValue =
    name === "tagName" && value.trim() && !value.startsWith("#")
    ? "#" + value.trim()
    : value;
    let message = "";
    const regex = /^[A-Za-z\s]*$/; // Only letters and spaces

    if (name === "tagName" && value.trim() && !/(^#?[A-Za-z]*$)/.test(value)) {
      updatedValue = value.slice(0, -1);
      message = "Only letters and spaces are allowed after #";
    } else if (name === "kharchaName" && value.trim() && !regex.test(value)) {
      updatedValue = value.slice(0, -1);
      message = "Only letters and spaces are allowed";
    } else if (name === "payer" && value.trim() && !regex.test(value)) {
      updatedValue = value.slice(0, -1);
      message = "Only letters and spaces are allowed";
    } else {
      updatedValue = value;
      message = "";
    }

    setValidationMessage((prev) => ({ ...prev, [name]: message }));
    console.log("updated entry from karchaentry");
    handleEntryChange(index, { ...entry, [name]: updatedValue });
  }

  function handleTabKey(event) {
    if (event.key == "Tab") {
      tabNewEntry();
    }
  }

  function setSuggestionPosition(tags, event) {
    const suggestionContainer = document.getElementById("suggestion-container");
    if (!suggestionContainer) return;
    // Only apply on small screens (e.g., max 768px wide = typical phone/tablet breakpoint)
    if (window.matchMedia("(max-width: 768px)").matches) {
      const rect = event.target.getBoundingClientRect();

      suggestionContainer.style.position = "absolute";
      // suggestionContainer.style.backgroundColor = "red"; // debug
      // Place it above the input
      suggestionContainer.style.top = rect.top - 110 + window.scrollY + "px";
    } else {
      // Reset for desktop
      suggestionContainer.style.position = "static";
      suggestionContainer.style.backgroundColor = "transparent";
    }
  }

  return (
    <Section sectionMode={sectionMode}>
      <div className="pt-4 suggestion-group entry">
        <input
          type="text"
          name="tagName"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.tagName}
          onChange={onChange}
          onFocus={(e) => {
            setSuggestionPosition("tagName", e);
            setSuggestionType("tags");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => handleTagNameSanitize(index, e, "tagName")}
          placeholder="Tag Name"
          pattern="[A-Za-z#]+"
          autoComplete="off"
          required
        ></input>
        {validationMessage.tagName && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage.tagName}
          </p>
        )}
      </div>

      <div className="pt-4 entry">
        <input
          type="text"
          name="kharchaName"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.kharchaName}
          onClick={(e) => e.stopPropagation()}
          onChange={onChange}
          onBlur={(e) => handleTagNameSanitize(index, e, "kharchaName")}
          placeholder="Kharcha Name"
          pattern="[A-Za-z]+"
          autoComplete="off"
          required
        ></input>
        {validationMessage.kharchaName && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage.kharchaName}
          </p>
        )}
      </div>

      <div className="pt-4 suggestion-group entry">
        <input
          type="text"
          name="payer"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          value={entry.payer}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => {
            setSuggestionPosition("payer", e);
            setSuggestionType("payers");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onBlur={(e) => handleTagNameSanitize(index, e, "payer")}
          onChange={onChange}
          placeholder="Paid By"
          pattern="[A-Za-z]+"          
          autoComplete="off"
          required
        ></input>
        {validationMessage.payer && (
          <p className="text-red-500 text-xs mt-1">{validationMessage.payer}</p>
        )}
      </div>

      <div className="pt-4 entry">
        <input
          type="number"
          className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
          name="amount"
          value={entry.amount}
          onClick={(e) => e.stopPropagation()}
          onChange={onChange}
          onBlur={(e) => handleTagNameSanitize(index, e, "amount")}
          onKeyDown={handleTabKey}
          placeholder="Amt"
          autoComplete="off"
          required
        ></input>
        {validationMessage.amount && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage.amount}
          </p>
        )}
        {entry.amount > 0 && (
          <span className="text-sm text-gray-500 ml-2">
            ₹{entry.amount.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </Section>
  );
}
