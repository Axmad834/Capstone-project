export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-white justify-center font-bold flex bg-transparent">
      <p>©{year} Copyright Yariga, Inc. All rights reserved.</p>
    </div>
  );
};
