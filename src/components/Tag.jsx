export default function Tag({ tagName, setSelectedTag, entryIndex }) {
  return (
    <>
      <button
        className="border-gray-500 text-sm border-2 px-4 py-2 items-center bg-gray-200 font-kvittype rounded hover:bg-gray-300"
        onClick={() => setSelectedTag({"entryIndex" : entryIndex, "tagName": tagName})}
      >
        {tagName}
      </button>
    </>
  );
}
