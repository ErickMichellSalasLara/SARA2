import React from "react";

function Button({
  targetId = "two",
  text = "Learn more",
  className = "button",
}) {
  const handleClick = () => {
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ul className="actions">
      <li>
        <button
          type="button"
          className={className}
          onClick={handleClick}
        >
          {text}
        </button>
      </li>
    </ul>
  );
}

export default Button;