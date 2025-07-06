import type { Crates } from "../types";

interface CrateProps {
  crate: Crates;
  size?: "small" | "medium" | "large";
  onClick?: (crate: Crates) => void;
  className?: string;
}

export default function Crate({
  crate,
  size = "medium",
  onClick,
  className = "",
}: CrateProps) {
  const sizeClasses = {
    small: {
      container: "max-w-xs p-3",
      image: "h-32 w-full",
      title: "text-sm font-semibold",
    },
    medium: {
      container: "max-w-sm p-4",
      image: "h-40 w-full",
      title: "text-base font-semibold",
    },
    large: {
      container: "max-w-md p-6",
      image: "h-48 w-full",
      title: "text-lg font-semibold",
    },
  };

  const currentSize = sizeClasses[size];

  const handleClick = () => {
    if (onClick) {
      onClick(crate);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
        onClick ? "cursor-pointer hover:scale-105" : ""
      } ${currentSize.container} ${className}`}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={crate.image}
          alt={crate.name}
          className={`object-cover ${currentSize.image}`}
        />
      </div>
      <div className="p-4">
        <h3 className={`${currentSize.title} text-gray-900 dark:text-white`}>
          {crate.name}
        </h3>
      </div>
    </div>
  );
}
