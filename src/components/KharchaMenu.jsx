import KharchaEntry from "./KharchaEntry";
import { useState } from "react";
import { useEffect } from "react";

export default function KharchaMenu({
  sectionMode,
  setTotal,
  selectedSuggestion,
  setIsSuggestionListVisible,
  setFocusedEntryIndex,
  setOptions,
  setSuggestionType,
}) {
  const [kharchaEntries, setKharchaEntries] = useState([]);
  const [showAddHint, setShowAddHint] = useState(false);
  
  function handleEntryChange(index, updatedEntry) {
    const updatedEntries = [...kharchaEntries];
    updatedEntries[index] = updatedEntry;

    setKharchaEntries(updatedEntries);
    const sum = updatedEntries.reduce(
      (acc, curr) => acc + (Number(curr.amount) || 0),
      0
    );
    setTotal(sum);
  }

  useEffect(() => {
    if (!selectedSuggestion || selectedSuggestion.entryIndex == null) return;

    const { type, entryIndex, value } = selectedSuggestion;
    setKharchaEntries((prev) => {
      if (!prev[entryIndex]) return prev;
      const updated = [...prev];
      if (type === "tag")
        updated[entryIndex] = { ...updated[entryIndex], tagName: value };
      if (type === "payer")
        updated[entryIndex] = { ...updated[entryIndex], payer: value };
      return updated;
    });
  }, [selectedSuggestion]);

  //   useEffect(() => {
  //     // Update options for suggestions
  //     const tagsSet = new Set();
  //     const payersSet = new Set();
  //     kharchaEntries.forEach((entry) => {
  //       if (entry.tagName && entry.tagName.length > 1) {
  //         tagsSet.add(entry.tagName);
  //       }
  //       if (entry.payer && entry.payer.length > 0) {
  //         payersSet.add(entry.payer);
  //       }
  //     });
  // setOptions((preOptions) => {
  //   return {
  //     tags: [...preOptions.tags, ...Array.from(tagsSet).sort()],
  //     payers: [...preOptions.payers, ...Array.from(payersSet).sort()],
  //   }
  // });
  //   }, [kharchaEntries, setOptions]);

  useEffect(() => {
    const allFilled =
      kharchaEntries.length > 0 &&
      kharchaEntries.every(
        (entry) =>
          isValidTagName(entry.tagName) &&
          entry.kharchaName.trim() &&
          entry.payer.trim() &&
          entry.amount > 0
      );
    setShowAddHint(allFilled);
  }, [kharchaEntries]);

  function isValidTagName(tag) {
    const trimmed = tag.trim();
    return trimmed.length > 1 && trimmed.startsWith("#");
  }

  function handleAddNewEntry() {
    if (kharchaEntries.length === 0) {
      // First entry
      setKharchaEntries([
        { tagName: "", kharchaName: "", payer: "", amount: 0 },
      ]);
    } else {
      const latestEntry = kharchaEntries[kharchaEntries.length - 1];

      // Add new entry only if the last one is fully filled
      if (
        isValidTagName(latestEntry.tagName) &&
        latestEntry.kharchaName.trim() &&
        latestEntry.payer.trim() &&
        latestEntry.amount > 0
      ) {
        setKharchaEntries([
          ...kharchaEntries,
          { tagName: "", kharchaName: "", payer: "", amount: 0 },
        ]);
      }
    }
  }

  //   function handleTagNameNormalize(index) {
  //   const entry = kharchaEntries[index];
  //   if (entry.tagName.trim() && !entry.tagName.startsWith("#")) {
  //     const normalizedEntry = { ...entry, tagName: "#" + entry.tagName.trim() };
  //     handleEntryChange(index, normalizedEntry);
  //   }
  //   }

  function handleTagNameSanitize(index, e, field) {
    const related = e.relatedTarget; // where focus is going
    if (!related || !related.closest(".suggestion-group")) {
      setTimeout(() => setIsSuggestionListVisible(false), 150);
    }

    const entry = kharchaEntries[index];
    let normalizedEntry = { ...entry };

    switch (field) {
      case "tagName": {
        let tag = entry.tagName.trim();
        if (tag === "#") tag = "";
        if (tag && !tag.startsWith("#")) tag = "#" + tag;
        if (tag.length > 1) {
          // capitalize first letter after #
          tag = "#" + tag[1].toUpperCase() + tag.slice(2);
        }
        normalizedEntry.tagName = tag;
        break;
      }

      case "kharchaName": {
        let name = entry.kharchaName.trim();
        if (name) {
          name = name.charAt(0).toUpperCase() + name.slice(1);
        }
        normalizedEntry.kharchaName = name;
        break;
      }

      case "payer": {
        let payer = entry.payer.trim();
        if (payer) {
          payer = payer.charAt(0).toUpperCase() + payer.slice(1);
        }
        normalizedEntry.payer = payer;
        break;
      }

      case "amount": {
        let amt = Number(entry.amount);
        if (isNaN(amt) || amt < 0) amt = 0;
        // Round to integer (₹ doesn’t usually have decimals in casual kharcha tracking)
        amt = Math.round(amt);

        normalizedEntry.amount = amt;
        break;
      }

      default:
        break;
    }

    // Only update if something actually changed
    if (JSON.stringify(normalizedEntry) !== JSON.stringify(entry)) {
      handleEntryChange(index, normalizedEntry);
    }
  }

  return (
    <>
      <div className="">
        <div
          id="container"
          className="bg-gray-100 border-b border-gray-400 mt-3 mb-3 overflow-auto min-h-screen px-2 pb-10"
          onClick={handleAddNewEntry}
        >
          {kharchaEntries.length === 0 ? (
            <div className="p-8 text-gray-600 flex items-center justify-center space-x-2">
              <span className="text-3xl text-red-500 font-bold pb-1">+</span>
              <span>Please click here to add new Kharcha</span>
            </div>
          ) : (
            <div>
              <div
                id="entries"
                className="grid grid-cols-2 max-sm:grid-cols-2 md:grid-cols-4 gap-4"
              >
                {kharchaEntries.map((entry, index) => (
                  <KharchaEntry
                    key={index}
                    index={index}
                    entry={entry}
                    handleEntryChange={handleEntryChange}
                    tabNewEntry={handleAddNewEntry}
                    sectionMode = {sectionMode}
                    //   handleTagNameNormalize={handleTagNameNormalize}
                    handleTagNameSanitize={handleTagNameSanitize}
                    setIsSuggestionListVisible={setIsSuggestionListVisible}
                    setFocusedEntryIndex={setFocusedEntryIndex}
                    setSuggestionType={setSuggestionType}
                  />
                ))}
              </div>
              {showAddHint && (
                <div className="AddNewEntryHint p-8 text-gray-600 flex items-center justify-center space-x-2">
                  <span className="plus-sign text-3xl text-red-500 font-bold pb-1">
                    +
                  </span>
                  <span>Click to add new entry</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 italic pb-10 px-2">
          * Click anywhere in the gray area to add a new entry
        </div>
      </div>
    </>)
};
