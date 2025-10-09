import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import Suggestions from "./Suggestions";
import KharchaEntries from "./KharchaEntries";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
;
function KharchaMain() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const location = useLocation();
  const eventfromNav = location.state?.event;


  //Fallback: fetch from localstorage if user refreshed
  const allEvents = JSON.parse(localStorage.getItem("events") || '[]');
  const eventData = eventfromNav || allEvents.find(e => e.id === Number(eventId))

useEffect(() => {
  if (!eventData) {
    navigate("/");
  }
}, [eventData, navigate]);
  
  const [total, setTotal] = useState(0);
  const [options, setOptions] = useState({
    tags: ["#Food", "#Travel", "#Movies", "#Hotel", "#Entertainment"],
    payers: [...eventData['participants']],
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
      <KharchaEntries
        eventData={eventData}
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
export default KharchaMain;
