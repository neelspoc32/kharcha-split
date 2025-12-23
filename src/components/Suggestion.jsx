export default function Suggestion({
  suggestion,
  suggestionType,
  setSelectedSuggestion,
  entryIndex,
}) {
  let selected = {};
  switch (suggestionType) {
    case "tags":
      selected = { type: "tag", entryIndex, value: suggestion };
      break;
    case "payers":
      selected = { type: "payer", entryIndex, value: suggestion };
      break;
    default:
      return null;
  }
  return (
    <>
      <button
        className="border-gray-500 text-sm border-2 px-4 py-2 items-center bg-gray-200 font-kvittype rounded hover:bg-gray-300"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedSuggestion(selected);
        }}
      >
        {suggestion}
      </button>
    </>
  );
}
