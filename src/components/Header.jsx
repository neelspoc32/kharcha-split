import kharchaLogo from "../assets/kharcha_split_logo.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

function Header({ sectionMode, setSectionMode }) {
  const handleSwitchChange = (event, newSectionMode) => {
    if (newSectionMode !== null) {
      setSectionMode(newSectionMode);
    }
  };
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
        <div className='pl-2 pr-2 flex justify-between'><img src={kharchaLogo} className="object-cover h-10 w-15 pb-4" alt="my logo" /><span className="header text-3xl text-center font-kvittype text-red-500">KHARCHA PAANI</span></div>
        {/* <span className="hr"></span> */}
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <hr className="pt-1.5 decoration-gray-500 font-bold " />
      <hr className="pt-1.5 decoration-gray-500 font-bold" />
      <div className="flex items-center">
        <span className="flex-none"></span>
        <p className="pl-12 flex-1 tag-line italic">
          Split your kharcha among friends!
        </p>
      </div>
      <span className="flex justify-end pr-2">
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
