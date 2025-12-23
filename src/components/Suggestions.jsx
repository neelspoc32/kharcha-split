import Suggestion from "./Suggestion";
export default function Suggestions({
  options,
  isVisible,
  focusedEntryIndex,
  setSelectedSuggestion,
  suggestionType
}) {

  const  suggestionsList = suggestionType === "tags" 
      ? options.tags 
      : options.payers;
  if (!isVisible) return null;
//   if (options.tags) {
//     suggestionType = "tags";
//     suggestionsList = options.tags;
//   } else if (options.payers) {
//     suggestionType = "payers";
//     suggestionsList = options.payers;
//   }


  return (
    <div id="suggestion-container" className=" flex flex-wrap justify-center gap-2 p-2 m-1  bg-white rounded shadow-md">
      {suggestionsList.map((suggestion, index) => {
        return (
          <Suggestion
            key={index}
            suggestion={suggestion}
            suggestionType={suggestionType}
            entryIndex={focusedEntryIndex}
            setSelectedSuggestion={setSelectedSuggestion}
          />
        );
      })}
    </div>
  );
}
