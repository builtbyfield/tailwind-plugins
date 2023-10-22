import { useState } from "react";

export function LayoutOverlay() {
  const [isHidden, setIsHidden] = useState(true);

  const handleOnClick = () => {
    setIsHidden((isHidden) => !isHidden);
  };

  return (
    <div className="layout-overlay">
      <button className="layout-overlay-toggle" onClick={handleOnClick} />
      <div className="layout-overlay-grid" hidden={isHidden} />
    </div>
  );
}
