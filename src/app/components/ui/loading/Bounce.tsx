const Bounce = () => {
  return (
    <div className="bouncing-loader bg-[theme(--muted)]">
      <div className="bg-[theme(--primary)]"></div>
      <div className="bg-[theme(--primary)]"></div>
      <div className="bg-[theme(--primary)]"></div>
    </div>
  );
};

export default Bounce;
