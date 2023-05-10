const SectionTitle = ({ span, p, h2 }) => {
  return (
    <div
      className=" flex
gap-1 items-center flex-col text-center"
    >
      <span className="uppercase text-sm font-bold tracking-widest">
        {span}
      </span>
      <h2 className="text-3xl">{h2}</h2>
      <p className="text-gray-500">{p}</p>
    </div>
  );
};

export default SectionTitle;
