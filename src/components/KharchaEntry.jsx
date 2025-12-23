import TextField from "@mui/material/TextField";
import Section from "./Section";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export default function KharchaEntry({
  entry,
  index,
  handleEntryChange,
  tabNewEntry,
  sectionMode,
  validationMessage,
  handleTagNameSanitize,
  setIsSuggestionListVisible,
  setFocusedEntryIndex,
  setSuggestionType,
  setValidationMessage,
  onDelete,
}) {
  const inputSx = {
    width: "100%",
    pb: 0,
    mb: 0,
    px: 1,
    outline: "none",
    textTransform: "capitalize", 
    "&:focus-within": {
      borderColor: "red.600",
      borderBottomWidth: 3,
    },
  };

  const FIELD_RULES = {
    tagName: {
      sanitize: sanitizeTagName,
      message: "Only letters are allowed after #",
    },
    kharchaName: {
      sanitize: sanitizeLettersAndSpaces,
      message: "Only letters and spaces are allowed",
    },
    payer: {
      sanitize: sanitizeLettersAndSpaces,
      message: "Only letters and spaces are allowed",
    },
  };

  function sanitizeTagName(value) {
    const hasHash = value.startsWith("#");
    const lettersOnly = value.replace(/[^A-Za-z]/g, "");
    return hasHash ? "#" + lettersOnly : lettersOnly;
  }

  function sanitizeLettersAndSpaces(value) {
    return value.replace(/[^A-Za-z\s]/g, "");
  }

  function onChange(index, e) {
    const { name, value } = e.target;

    let updatedValue = value;
    let message = "";

    const rule = FIELD_RULES[name];

    if (rule) {
      const sanitized = rule.sanitize(value);

      if (sanitized !== value) {
        message = rule.message;
      }

      updatedValue = sanitized;
    }

    const updatedMessages = [...validationMessage];
    updatedMessages[index] = {
      ...(updatedMessages[index] || {}),
      [name]: message,
    };

    setValidationMessage(updatedMessages);
    handleEntryChange(index, { ...entry, [name]: updatedValue });
  }

  function handleTabKey(event) {
    if (event.key == "Tab") {
      tabNewEntry();
    }
  }

  function handleSplitClick(index) {
    console.log("Split clicked for entry:", index);
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
    <Section
      sectionMode={sectionMode}
      onClick={() => setFocusedEntryIndex(index)}
    >
      <div className="pt-4 entry suggestion-group">
        <TextField
          type="text"
          name="tagName"
          variant="standard"
          sx={inputSx}
          value={entry.tagName}
          onChange={(e) => onChange(index, e)}
          onFocus={(e) => {
            setSuggestionPosition("tagName", e);
            setSuggestionType("tags");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onBlur={(e) => handleTagNameSanitize(index, e, "tagName")}
          placeholder="Tag Name"
          pattern="[A-Za-z#]+"
          autoComplete="off"
          required
        ></TextField>
        {validationMessage[index]?.tagName && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage[index].tagName}
          </p>
        )}
      </div>
      <div className="pt-4 entry">
        <TextField
          type="text"
          name="kharchaName"
          variant="standard"
          sx={inputSx}
          value={entry.kharchaName}
          onChange={(e) => onChange(index, e)}
          onBlur={(e) => handleTagNameSanitize(index, e, "kharchaName")}
          placeholder="Kharcha Name"
          pattern="[A-Za-z]+"
          autoComplete="off"
          required
        ></TextField>
        {validationMessage[index]?.kharchaName && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage[index].kharchaName}
          </p>
        )}
      </div>

      <div className="pt-4 suggestion-group entry">
        <TextField
          type="text"
          name="payer"
          sx={inputSx}
          variant="standard"
          value={entry.payer}
          onFocus={(e) => {
            setSuggestionPosition("payer", e);
            setSuggestionType("payers");
            setIsSuggestionListVisible(true);
            setFocusedEntryIndex(index);
          }}
          onBlur={(e) => handleTagNameSanitize(index, e, "payer")}
          onChange={(e) => onChange(index, e)}
          placeholder="Paid By"
          pattern="[A-Za-z]+"
          autoComplete="off"
          required
        ></TextField>

        {validationMessage[index]?.payer && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage[index].payer}
          </p>
        )}
      </div>
      <div className="pt-4 entry flex items-center">
        <TextField
          type="number"
          name="amount"
          sx={inputSx}
          variant="standard"
          value={entry.amount}
          onChange={(e) => onChange(index, e)}
          onBlur={(e) => handleTagNameSanitize(index, e, "amount")}
          onKeyDown={handleTabKey}
          placeholder="Amt"
          autoComplete="off"
          required
        ></TextField>
        {validationMessage[index]?.amount && (
          <p className="text-red-500 text-xs mt-1">
            {validationMessage[index].amount}
          </p>
        )}
        {entry.amount > 0 && (
          <span className="absolute pl-25 text-sm text-gray-500 ml-2">
            ₹{entry.amount.toLocaleString("en-IN")}
          </span>
        )}
      </div>
      <div className="pt-4 max-sm:col-span-2 entry flex items-center overflow-visible justify-center">
        <button
          className="
        text-red-500 hover:text-red-700 hover:bg-red-50
        rounded-full p-1 focus:outline-none
        transition-all duration-200
        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            "
          aria-label="Delete entry"
          onClick={() => {
            onDelete(index);
          }}
          title="Delete Entry"
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </Section>
  );
}
