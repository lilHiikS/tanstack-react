import type { Collection } from "../types";

interface CollectionProps {
  collection: Collection;
  /** Size variant for different display contexts */
  size?: "small" | "medium" | "large";
  /** Optional click handler for collection selection */
  onClick?: (collection: Collection) => void;
  /** Optional className for custom styling */
  className?: string;
}

export default function Collection({
  collection,
  size = "medium",
  onClick,
  className = "",
}: CollectionProps) {
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
      onClick(collection);
    }
  };

  return (
    <div
      className={`
        ${currentSize.container} 
        bg-white dark:bg-gray-800 
        rounded-xl 
        shadow-lg hover:shadow-xl 
        border border-gray-200 dark:border-gray-700
        transition-all duration-200 
        ${onClick ? "cursor-pointer hover:scale-105" : ""}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={collection.image}
          alt={collection.name}
          className={`
            ${currentSize.image} 
            object-cover 
            bg-gradient-to-br from-gray-100 to-gray-200 
            dark:from-gray-700 dark:to-gray-800
            transition-transform duration-200
            ${onClick ? "hover:scale-110" : ""}
          `}
          loading="lazy"
        />
      </div>

      {/* Collection Name */}
      <div className="text-center">
        <h3
          className={`
          ${currentSize.title} 
          text-gray-900 dark:text-white 
          line-clamp-2
        `}
        >
          {collection.name}
        </h3>
      </div>
    </div>
  );
}

export type { CollectionProps };
