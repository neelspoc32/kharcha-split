export default function Footer({totalAmount}) {
  return (
<div className="max=sm:fixed sticky bottom-2 max-sm:w-full">
<footer className=" border border-gray-400 bg-gray-200 h-10 flex justify-between items-center px-4 font-kvittype">
      <span>Total:</span>
      <span className="pl-2">₹{totalAmount.toLocaleString("en-IN")}</span>
    </footer>
    </div>
  );
}