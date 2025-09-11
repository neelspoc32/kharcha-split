import kharchaLogo from '../assets/kharcha_split_logo.svg';
function Header() {
return (
    <> 
    <img src={kharchaLogo} className="object-cover h-30 w-35 mx-auto pb-4" alt="my logo" />
        <header className="header text-3xl text-center font-kvittype text-red-500">KHARCHA PAANI</header>
        {/* <span className="hr"></span> */}
        <hr className="pt-1.5 decoration-gray-500 font-bold" />
        <hr className="pt-1.5 decoration-gray-500 font-bold " />
        <hr className="pt-1.5 decoration-gray-500 font-bold" />
        <p className="tag-line text-center italic">Split your kharcha among friends!</p>
    </>
)}

export default Header;