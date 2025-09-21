import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Suggestions from "./components/Suggestions";
import KharchaMenu from "./components/KharchaMenu";
import { useState } from "react";

function App() {
  const [total, setTotal] = useState(0);
  const [options, setOptions] = useState({
    tags: ["#Food", "#Travel", "#Movies", "#Hotel", "#Entertainment"],
    payers: ["John", "Adam", "Gauel"],
  });
  const [isSuggestionListVisible, setIsSuggestionListVisible] = useState(false);
  const [suggestionType, setSuggestionType] = useState(null); // "tags" | "payers"
  const [focusedEntryIndex, setFocusedEntryIndex] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState({});
  const [sectionMode, setSectionMode] = useState("");

  return (
    <>
      <Header sectionMode={sectionMode} setSectionMode={setSectionMode} />
      <div
        className=" top-1 w-full bg-white/50 sticky backdrop-blur-sm"
        id="suggestion-container"
      >
        <Suggestions
          options={options}
          isVisible={isSuggestionListVisible}
          focusedEntryIndex={focusedEntryIndex}
          setSelectedSuggestion={setSelectedSuggestion}
          suggestionType={suggestionType}
        />
      </div>
      <KharchaMenu
        sectionMode={sectionMode}
        setTotal={setTotal}
        setSectionMode={setSectionMode}
        setSelectedSuggestion={setSelectedSuggestion}
        setIsSuggestionListVisible={setIsSuggestionListVisible}
        setFocusedEntryIndex={setFocusedEntryIndex}
        selectedSuggestion={selectedSuggestion}
        setOptions={setOptions}
        setSuggestionType={setSuggestionType}
      />
      <Footer totalAmount={total} />
    </>
  );
}

//   handleSelectTag={(selectedTag) => {
//      handleEntryChange(focusedEntryIndex, { ...kharchaEntries[focusedEntryIndex],
//     tagName: selectedTag,
//   })
//     setIsTagListVisible(false);
// }}
export default App;
