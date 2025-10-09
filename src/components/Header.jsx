import kharchaLogo from "../assets/kharcha_split_logo.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
function Header({ sectionMode, setSectionMode }) {
  const handleSwitchChange = (event, newSectionMode) => {
    if (newSectionMode !== null) {
      setSectionMode(newSectionMode);
    }
  };
   const navigate = useNavigate();
  function sendBack() {
    navigate(-1);
    //window.history.back();
  }

  return (
    <>
      <div className="flex items-center pb-1">
        <img
          src={kharchaLogo}
          className=" flex-none h-10 w-12 ml-2"
          viewBox="0 0 24 24"
          alt="my logo"
        />
        <header className="flex-1 header text-3xl text-center font-kvittype text-red-500">
          KHARCHA PAANI
        </header>
      </div>
      {/* 
        
         */}
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <hr className="pt-1.5 decoration-gray-500 font-bold " />
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <div className="flex items-center">
        <span className="flex-none"></span>
        <p className="pl-12 flex-1 tag-line italic">
          Split your kharcha among friends!
        </p>
      </div>
      <span className="flex justify-between pr-2">
        <Button color="error" startIcon={<BackIcon />} onClick={sendBack}>Back</Button>
        {sectionMode && (
          <ToggleButtonGroup
            value={sectionMode}
            exclusive
            size="small"
            onChange={handleSwitchChange}
            aria-label="text alignment"
            className="pt-1"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </span>
    </>
  );
}

export default Header;
