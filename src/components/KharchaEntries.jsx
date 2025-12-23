import KharchaEntry from "./KharchaEntry";
import { useState } from "react";
import { useEffect } from "react";

export default function KharchaEntries({
  eventData,
  sectionMode,
  setSectionMode,
  setTotal,
  selectedSuggestion,
  setIsSuggestionListVisible,
  setFocusedEntryIndex,
  setOptions,
  setSuggestionType,
}) {
  const [kharchaEntries, setKharchaEntries] = useState([]);
  const [showAddHint, setShowAddHint] = useState(false);
  const [validationMessage, setValidationMessage] = useState([]);

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
      setSectionMode("left");
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

  function handleDeleteEntry(index) {
    if (!confirm("Delete this entry?")) return;
    setKharchaEntries((prev) => prev.filter((_, i) => i !== index));
  }

  const SUGGESTION_LIST_HIDE_DELAY_MS = 150;

  function handleTagNameSanitize(index, e, field) {
    const related = e.relatedTarget; // where focus is going
    const updatedMessages = [...validationMessage];
    if (!related || !related.closest(".suggestion-group")) {
      setTimeout(
        () => setIsSuggestionListVisible(false),
        SUGGESTION_LIST_HIDE_DELAY_MS
      );
    }

    const entry = kharchaEntries[index];
    let normalizedEntry = { ...entry };
    updatedMessages[index] = {}; // Initialize to avoid undefined
    setValidationMessage(updatedMessages);
    switch (field) {
      case "tagName": {
        let tag = entry.tagName.trim();
        if (tag === "#") tag = "";
        if (tag) {
          if (!tag.startsWith("#")) tag = "#" + tag;
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
  // When a suggestion is selected, update the relevant entry
  useEffect(() => {
    if (!selectedSuggestion || selectedSuggestion.entryIndex === null) return;

    const { type, entryIndex, value } = selectedSuggestion;
    const updatedMessages = [...validationMessage];
    setKharchaEntries((prev) => {
      if (!prev[entryIndex]) return prev;
      const updated = [...prev];
      if (type === "tag") {
        updated[entryIndex] = { ...updated[entryIndex], tagName: value };
        updatedMessages[entryIndex] = { [type]: "" };
        setValidationMessage(updatedMessages);
      } else if (type === "payer") {
        updated[entryIndex] = { ...updated[entryIndex], payer: value };
        updatedMessages[entryIndex] = { [type]: "" };
        setValidationMessage(updatedMessages);
      }
      return updated;
    });
  }, [selectedSuggestion]);

  // Show "Add new entry" hint only if all existing entries are valid
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

  // Persist kharchaEntries to localStorage when they change
  useEffect(() => {
    if (!eventData) {
      console.warn("No event data available to save entries.");
      return;
    }

    //Filtering out incomplete / blank entries before saving
    const validEntries = kharchaEntries.filter(
      (entry) =>
        entry.tagName?.trim() &&
        entry.kharchaName?.trim() &&
        entry.payer?.trim() &&
        Number(entry.amount) > 0
    );

    const allEvents = JSON.parse(localStorage.getItem("events") || "[]");

    const updatedEvents = allEvents.map((e) =>
      e && e.id === eventData.id
        ? {
            ...e,
            entries: validEntries,
          }
        : e
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));
  }, [kharchaEntries, eventData]);

  return (
    <>
      <div className="">
        <div
          id="container"
          className="bg-gray-100 border-b border-gray-400 mt-3 mb-3 overflow-auto min-h-screen px-2 pb-10"
          onClick={(e) => {
            // Click inside suggestion UI → ignore
            if (
              e.target.closest(".suggestion-group") ||
              e.target.closest("#suggestion-container")
            ) {
              return;
            }

            // Otherwise → add new entry
            handleAddNewEntry();
          }}
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
                onClick={(e) => {
                if(sectionMode=="left") {
                // Prevent click from propagating to container when in 'left' mode
                e.stopPropagation()
                }
                }
                } 
                className={
                  sectionMode == "left"
                    ? "flex flex-col self-baseline"
                    : "flex flex-wrap gap-4"
                }
              >
                {kharchaEntries.map((entry, index) => (
                  <KharchaEntry
                    key={index}
                    index={index}
                    entry={entry}
                    handleEntryChange={handleEntryChange}
                    handleDeleteEntry={handleDeleteEntry}
                    tabNewEntry={handleAddNewEntry}
                    sectionMode={sectionMode}
                    validationMessage={validationMessage}
                    //   handleTagNameNormalize={handleTagNameNormalize}
                    handleTagNameSanitize={handleTagNameSanitize}
                    setIsSuggestionListVisible={setIsSuggestionListVisible}
                    setFocusedEntryIndex={setFocusedEntryIndex}
                    setSuggestionType={setSuggestionType}
                    setValidationMessage={setValidationMessage}
                    onDelete={handleDeleteEntry}
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
    </>
  );
}
