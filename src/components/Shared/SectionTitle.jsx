const SectionTitle = ({ heading, subtitle }) => {
  return (
    <div className="text-center flex justify-center mb-8">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {heading}
        </h1>
        <p className="text-base-content text-opacity-65"> {subtitle} </p>
      </div>
    </div>
  );
};

export default SectionTitle;
