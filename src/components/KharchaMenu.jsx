import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import kharchaLogo from "../assets/kharcha_split_logo.svg";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/check";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KharchaMenu() {
  const [participants, setParticipants] = useState([""]);
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [touched, setTouched] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function handleAddParticipant() {
    setParticipants((oldParticipants) => [...oldParticipants, ""]);
    // Logic to add more participant fields
    console.log("Add Participant button clicked");
  }

  function handleEventName(event) {
    setEventName(() => event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Mark all fields as touched on submit
    setTouched(new Set(participants.map((_, i) => i)));

    // Check if any participant is empty
    if (participants.some((p) => p.trim() === "")) {
      setErrorMessage("Please fill in all participant names.");
      console.warn("Please fill in all participant names.");
      return; // Stop submission
    } else {
      setErrorMessage("");
    }

    const savedEvents = JSON.parse(localStorage.getItem("events") || "[]")

    const newEvent = {
      id: Date.now(),
      eventName: eventName,
      participants: participants,
      date: selectedDate.format("DD-MM-YY"),
    };

    // Save data into local storage
    localStorage.setItem("events", JSON.stringify([...savedEvents, newEvent]))
    navigate(`/entries/${newEvent.id}`, {state: {event : newEvent}})
    console.log("local storage data")
    console.log(JSON.parse(localStorage.getItem("events")))
  }

  function resetAllEvents() {
  if (confirm("Are you sure you want to delete all events?")) {
    localStorage.removeItem("events");
    alert("All events cleared!");
  }
}

  return (
    <>
      <img
        src={kharchaLogo}
        className="object-cover h-30 w-35 mx-auto pb-4"
        alt="my logo"
      />
      <header className="header text-3xl text-center font-kvittype text-red-500">
        KHARCHA PAANI
      </header>
      {/* <span className="hr"></span> */}
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <hr className="pt-1.5 decoration-gray-500 font-bold " />
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <p className="tag-line text-center italic">
        Split your kharcha among friends!
      </p>
      <Container
        maxWidth="sm"
        sx={{
          mt: 3,
          backgroundColor: "grey.100",
          borderRadius: 2,
          border: 1,
          borderColor: "grey.400",
        }}
      >
        {errorMessage && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="error"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Alert>
        )}
        <Typography
          component="h1"
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            pt: 2,
            fontFamily: "Kvittype",
            color: "grey.700",
            backgroundColor: "red.500",
            py: 1,
            borderRadius: 1,
          }}
        >
          Create New Event
        </Typography>
        <Divider />
        <Box
          component={"form"}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
        >
          <TextField
            type="text"
            name="eventName"
            label="Event Name"
            value={eventName}
            onChange={handleEventName}
            fullWidth
            required
            autoFocus
            placeholder="e.g Goa Trip, Diwali Party, Coffee Hangout ... "
            variant="standard"
          />
          {participants.map((participant, index) => (
            <TextField
              key={index}
              type="text"
              placeholder={"Enter participant name"}
              error={touched.has(index) && participant.trim() === ""}
              onBlur={() => {
                setTouched((prev) => new Set(prev).add(index));
              }}
              name={`participant_${index + 1}`}
              value={participant}
              onChange={(event) => {
                setParticipants((oldParticipants) => {
                  let copy = [...oldParticipants];
                  copy[index] = event.target.value;
                  return copy;
                });
              }}
              label={`Participant ${index + 1}`}
              fullWidth
              required
              variant="standard"
              helperText={
                touched.has(index) && participant.trim() === ""
                  ? "Enter participant name"
                  : ""
              }
            />
          ))}
          {/* <TextField
                type="text"
                name="Participant1"
                label="Participant 1"
                fullWidth
                required
                variant="standard"
                /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddParticipant}
            sx={{ mt: 2 }}
          >
            Add More Participants
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Event Date"
              name="eventDate"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              format="DD-MM-YY"
              renderInput={(params) => (
                <TextField {...params} variant="standard" fullWidth />
              )}
            />
          </LocalizationProvider>
          <Button
            fullWidth
            variant="contained"
            color="error"
            component="label"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSubmit}
          >
            Create Event
            <input type="submit" hidden />
          </Button>
          {process.env.NODE_ENV === "development" && (
  <Button
    type="button"
    color="error" 
    variant="outlined"
    sx={{ mt: 2, mb: 2 }}
    fullWidth
    onClick={resetAllEvents}
  >
    🔄 Reset All Events (Dev)
  </Button>
)}
        </Box>
      </Container>
    </>
  );
}

//   <div
//     id="container"
//     className=" bg-gray-100 border-1 border-gray-400 mt-5 mb-3 overflow-auto mx-auto lg:w-150 md:w-100 px-2 pb-10 rounded-xl"
//   >
//     <span className="flex text-3xl border-b-2 p-3 text-black items-center border-gray-300 text-center font-kvittype">
//       Create New Event
//     </span>
//     <Box sx={{ "& button": { m: 1 } }}>
//       <form className="flex flex-col space-y-4 p-4">
//         <div>
//           <Input
//             type="text"
//             name="eventName"
//             className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
//             placeholder="Event Name"
//             pattern="[A-Za-z]+"
//             autoComplete="off"
//             required
//           ></Input>
//         </div>
//         <div>
//           <Input
//             type="text"
//             name="participants"
//             className="w-full px-4 py-2 focus:border-red-600 outline-0 focus:border-b-3 border-b-1 capitalize"
//             placeholder="Participants (comma separated)"
//             pattern="[A-Za-z, ]+"
//             autoComplete="off"
//             required
//           ></Input>
//         </div>
//         <div>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker />
//           </LocalizationProvider>
//         </div>
//         <div>
//           <Button fullWidth variant="contained" color="error" component="label">
//             Create Event
//             <input type="submit" hidden />
//           </Button>
//         </div>
//       </form>
//     </Box>
//     <div className="text-center text-gray-500 italic">OR</div>
//     <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-5">
//       Join Existing Event
//     </button>
//   </div>
