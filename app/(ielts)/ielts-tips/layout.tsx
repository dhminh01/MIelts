const IeltsTipsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="flex items-center justify-center pt-3 text-3xl font-bold text-slate-600">
        Ielts Tips and Tricks
      </h1>
      {children}
    </>
  );
};

export default IeltsTipsLayout;
