import KharchaEntry from "./KharchaEntry";
import { useState } from "react";
import { useEffect } from "react";

export default function KharchaMenu({
  setTotal,
  setTagNames,
  selectedTag,
  setIsTagListVisible,
  setFocusedEntryIndex,
}) {
  const [kharchaEntries, setKharchaEntries] = useState([]);

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
    if (
      kharchaEntries.length > 0 &&
      selectedTag.entryIndex != null &&
      kharchaEntries[selectedTag.entryIndex]
    ) {
      const oldKharchaEntries = [...kharchaEntries];
      oldKharchaEntries[selectedTag.entryIndex]["tagName"] =
        selectedTag.tagName;
      handleEntryChange(
        selectedTag["entryIndex"],
        oldKharchaEntries[selectedTag.entryIndex]
      );
    }
  }, [selectedTag]);

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

  function handleTagNameSanitize(index) {
    setTimeout(() => setIsTagListVisible(false), 150);
    const entry = kharchaEntries[index];
    if (entry.tagName.trim() && entry.tagName == "#") {
      const normalizedEntry = { ...entry, tagName: "" };
      handleEntryChange(index, normalizedEntry);
    }
  }

  return (
    <>
      <div className="">
        <div
          id="container"
          className="bg-gray-100 border-b border-gray-400 mt-3 mb-3 overflow-auto min-h-screen px-2"
          onClick={handleAddNewEntry}
        >
          {kharchaEntries.length === 0 ? (
            <div className="p-8 text-gray-600 flex items-center justify-center space-x-2">
              <span className="text-3xl text-red-500 font-bold pb-1">+</span>
              <span>Please click here to add new Kharcha</span>
            </div>
          ) : (
            <div
              id="entries"
              className="grid grid-cols-2 max-sm:grid-cols-4 md:grid-cols-4 gap-4"
            >
              {kharchaEntries.map((entry, index) => (
                <KharchaEntry
                  key={index}
                  index={index}
                  entry={entry}
                  handleEntryChange={handleEntryChange}
                  tabNewEntry={handleAddNewEntry}
                  //   handleTagNameNormalize={handleTagNameNormalize}
                  handleTagNameSanitize={handleTagNameSanitize}
                  setIsTagListVisible={setIsTagListVisible}
                  setFocusedEntryIndex={setFocusedEntryIndex}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
