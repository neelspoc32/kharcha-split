export default function Section({ sectionMode, onClick, children }) {
  // console.log("section mode in section", children, sectionMode);
    const handleClick = (e) => {
    e.stopPropagation(); // ✅ THIS IS THE MISSING PIECE
    onClick?.(e);
  };
  return sectionMode == "right" ? (
    <section
      onClick={handleClick}
      className="kharcha-row shrink p-3 my-4 border max-sm:w-[47%] border-gray-300 rounded-lg bg-gray-50 group"
    >
      {children}
    </section>
  ) : (
    <div
      onClick={handleClick}
      className="
            kharcha-row
          group
          grid grid-cols-2 max-sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]
          gap-4 items-center py-2 px-2
          hover:bg-gray-50 transition-colors
          border-1 border-b border-gray-300 bg-gray-50 mb-2 mt-3 shadow-sm rounded-lg
        "
    >
      {children}
    </div>
  );
}
