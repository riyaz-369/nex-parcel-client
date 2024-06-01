const FeaturedCard = ({ img, title, subtitle }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-6 rounded">
      <figure className="">
        <img src={img} className="rounded-xl" />
      </figure>
      <div className="items-center text-center">
        <h2 className="text-xl md:text-2xl font-semibold"> {title} </h2>
        <p> {subtitle} </p>
      </div>
    </div>
  );
};

export default FeaturedCard;
