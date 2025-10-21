const Bounce = () => {
  return (
    <div className="w-full bouncing-loader flex flex-row items-center justify-center">
      <div className="bg-[theme(--primary)]"></div>
      <div className="bg-[theme(--primary)]"></div>
      <div className="bg-[theme(--primary)]"></div>
    </div>
  );
};

export default Bounce;
