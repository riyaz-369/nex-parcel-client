const FeaturedCard = ({ img, title, subtitle }) => {
  return (
    <div className="shadow-lg p-6 rounded-xl h-96 border border-[#F43F5E] border-opacity-25 flex flex-col items-center justify-center transition-transform transform duration-300 hover:border hover:border-[#F43F5E] md:hover:scale-105 hover:shadow-2xl hover:bg-[#F43F5E] hover:bg-opacity-10">
      <figure className="overflow-hidden rounded-xl">
        <img className="w-32" src={img} />
      </figure>
      <div className="text-center space-y-3 mt-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-base-content text-opacity-65 text-sm md:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default FeaturedCard;
