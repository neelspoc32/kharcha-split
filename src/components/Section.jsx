export default function Section({ sectionMode, children }) {
  console.log("section mode in section", children, sectionMode);
  return sectionMode == "right" ? (
    <section className="p-4 my-4 border border-gray-300 rounded-lg bg-gray-50">
      {children}
    </section>
  ) : (
    <>{children}</>
  );
}
