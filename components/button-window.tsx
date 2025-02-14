"use client"


export function ButtonWindow({ children, url }: any) {
  const handleContactClick = () => {
    window.location.href = url;
  };

  return (
    <button onClick={ handleContactClick} className="flex items-center justify-center">
      {children}
    </button>
  );
}