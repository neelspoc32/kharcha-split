import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Tags from "./components/Tags";
import KharchaMenu from "./components/KharchaMenu";
import { useState } from "react";

function App() {
  const [total, setTotal] = useState(0);
  const [tagNames, setTagNames] = useState([
    "#Food",
    "#Travel",
    "#Movies",
    "#Hotel",
    "#Entertainment",
  ]);
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  const [focusedEntryIndex, setFocusedEntryIndex] = useState(null);
  const [selectedTag, setSelectedTag] = useState({})
  return (
    <>
      <Header />
      <div  className=" top-1 w-full bg-white/50 sticky backdrop-blur-sm">
      <Tags
        tagNames={tagNames}
        isVisible={isTagListVisible}
        focusedEntryIndex={focusedEntryIndex}
        setSelectedTag={setSelectedTag}
      />
      </div>
      <KharchaMenu
        setTotal={setTotal}
        setTagNames={setTagNames}
        setIsTagListVisible={setIsTagListVisible}
        setFocusedEntryIndex={setFocusedEntryIndex}
        selectedTag={selectedTag}
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
