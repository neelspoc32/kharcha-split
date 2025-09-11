import Tag from "./Tag"
export default function Tags({ tagNames, isVisible, focusedEntryIndex, setSelectedTag}) {
    if(!isVisible) return null;

    return (
        <div className=" flex flex-wrap justify-center gap-2 p-2 m-1  bg-white rounded shadow-md" >
            {tagNames.map((tagName, index) => {
              return <Tag key={index} tagName={tagName} entryIndex={focusedEntryIndex} setSelectedTag={setSelectedTag}/>  
            })}
        </div>
    )
}