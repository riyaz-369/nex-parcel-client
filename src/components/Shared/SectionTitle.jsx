const SectionTitle = ({ heading, subtitle }) => {
  return (
    <div className="text-center flex justify-center mb-6">
      <div className="lg:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {heading}
        </h1>
        <p className="px-6 lg:px-0"> {subtitle} </p>
      </div>
    </div>
  );
};

export default SectionTitle;
