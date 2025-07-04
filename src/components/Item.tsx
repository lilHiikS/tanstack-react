import type { Skin } from "../types";

interface ItemProps {
  skin: Skin;
  /** Size variant for different display contexts */
  size?: "small" | "medium" | "large";
  /** Optional click handler for skin selection */
  onClick?: (skin: Skin) => void;
  /** Optional className for custom styling */
  className?: string;
}

export default function SkinItem({
  skin,
  size = "medium",
  onClick,
  className = "",
}: ItemProps) {
  const sizeClasses = {
    small: {
      container: "max-w-xs p-3",
      image: "h-32 w-full",
      title: "text-sm font-semibold",
      weapon: "text-xs",
      description: "text-xs",
      stats: "text-xs",
    },
    medium: {
      container: "max-w-sm p-4",
      image: "h-40 w-full",
      title: "text-base font-semibold",
      weapon: "text-sm",
      description: "text-sm",
      stats: "text-sm",
    },
    large: {
      container: "max-w-md p-6",
      image: "h-48 w-full",
      title: "text-lg font-semibold",
      weapon: "text-base",
      description: "text-base",
      stats: "text-base",
    },
  };

  const currentSize = sizeClasses[size];

  const handleClick = () => {
    if (onClick) {
      onClick(skin);
    }
  };

  const formatFloat = (value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return "N/A";
    }
    return value.toFixed(2);
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
          src={skin.image}
          alt={skin.name}
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

        {/* Weapon Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`
            ${currentSize.weapon}
            px-2 py-1 
            bg-blue-500 dark:bg-blue-600 
            text-white 
            rounded-full 
            font-medium
            shadow-sm
          `}
          >
            {skin.weapon.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3
          className={`
          ${currentSize.title} 
          text-gray-900 dark:text-white 
          line-clamp-2
        `}
        >
          {skin.name}
        </h3>

        {/* Description */}
        <p
          className={`
          ${currentSize.description} 
          text-gray-600 dark:text-gray-300 
          line-clamp-3
        `}
        >
          {skin.description}
        </p>

        {/* Float Range Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className={`
              ${currentSize.stats} 
              text-gray-500 dark:text-gray-400 
              font-medium
            `}
            >
              Float Range
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center">
              <span
                className={`
                ${currentSize.stats} 
                text-green-600 dark:text-green-400 
                font-mono font-semibold
              `}
              >
                {formatFloat(skin.min_float)}
              </span>
              <span className="text-xs text-gray-400">Min</span>
            </div>

            {/* Visual Float Range Bar */}
            <div className="flex-1 mx-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {skin.min_float !== null && skin.max_float !== null ? (
                  <div
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
                    style={{
                      width: `${
                        ((skin.max_float - skin.min_float) / 1.0) * 100
                      }%`,
                      marginLeft: `${(skin.min_float / 1.0) * 100}%`,
                    }}
                  />
                ) : (
                  <div className="h-full bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">No data</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`
                ${currentSize.stats} 
                text-red-600 dark:text-red-400 
                font-mono font-semibold
              `}
              >
                {formatFloat(skin.max_float)}
              </span>
              <span className="text-xs text-gray-400">Max</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ItemProps };
