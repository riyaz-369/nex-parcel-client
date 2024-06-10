const Container = ({ children, my }) => {
  return (
    <div
      className={`max-w-7xl mx-auto ${
        my ? "my-6 md:my-8 lg:my-12" : "my-0"
      } p-2 lg:p-0`}
    >
      {children}
    </div>
  );
};

export default Container;
