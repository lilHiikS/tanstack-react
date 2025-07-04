import type { Sticker } from "../types";

interface StickerItemProps {
  sticker: Sticker;
  /** Size variant for different display contexts */
  size?: "small" | "medium" | "large";
  /** Optional click handler for sticker selection */
  onClick?: (sticker: Sticker) => void;
  /** Optional className for custom styling */
  className?: string;
}

export default function StickerItem({
  sticker,
  size = "medium",
  onClick,
  className = "",
}: StickerItemProps) {
  const sizeClasses = {
    small: {
      container: "max-w-xs p-3",
      image: "h-32 w-full",
      title: "text-sm font-semibold",
      rarity: "text-xs",
      description: "text-xs",
      stats: "text-xs",
    },
    medium: {
      container: "max-w-sm p-4",
      image: "h-40 w-full",
      title: "text-base font-semibold",
      rarity: "text-sm",
      description: "text-sm",
      stats: "text-sm",
    },
    large: {
      container: "max-w-md p-6",
      image: "h-48 w-full",
      title: "text-lg font-semibold",
      rarity: "text-base",
      description: "text-base",
      stats: "text-base",
    },
  };

  const currentSize = sizeClasses[size];

  const handleClick = () => {
    if (onClick) {
      onClick(sticker);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getRarityColor = (rarity: {
    id: string;
    name: string;
    color: string;
  }) => {
    // Use the color from the API if available, otherwise fallback to predefined colors
    if (rarity.color) {
      return `bg-[${rarity.color}]`;
    }

    const rarityColors: { [key: string]: string } = {
      "High Grade": "bg-blue-500 dark:bg-blue-600",
      Remarkable: "bg-purple-500 dark:bg-purple-600",
      Exotic: "bg-pink-500 dark:bg-pink-600",
      Extraordinary: "bg-red-500 dark:bg-red-600",
      Contraband: "bg-orange-500 dark:bg-orange-600",
      Default: "bg-gray-500 dark:bg-gray-600",
      default: "bg-gray-500 dark:bg-gray-600",
    };

    return rarityColors[rarity.name] || rarityColors["default"];
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
          src={sticker.image}
          alt={sticker.name}
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

        {/* Rarity Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`
            ${currentSize.rarity}
            px-2 py-1 
            ${getRarityColor(sticker.rarity)}
            text-white 
            rounded-full 
            font-medium
            shadow-sm
          `}
          >
            {sticker.rarity.name}
          </span>
        </div>

        {/* Price Badge - Only show if price exists */}
        {sticker.price && (
          <div className="absolute top-2 right-2">
            <span
              className={`
              ${currentSize.stats}
              px-2 py-1 
              bg-green-500 dark:bg-green-600
              text-white 
              rounded-full 
              font-medium
              shadow-sm
            `}
            >
              {formatPrice(sticker.price)}
            </span>
          </div>
        )}
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
          {sticker.name}
        </h3>

        {/* Description */}
        <p
          className={`
          ${currentSize.description} 
          text-gray-600 dark:text-gray-300 
          line-clamp-3
        `}
        >
          {sticker.description}
        </p>

        {/* Sticker Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className={`
              ${currentSize.stats} 
              text-gray-500 dark:text-gray-400 
              font-medium
            `}
            >
              Details
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Rarity
              </span>
              <span
                className={`
                ${currentSize.stats} 
                text-gray-900 dark:text-white 
                font-semibold
              `}
              >
                {sticker.rarity.name}
              </span>
            </div>

            {sticker.price && (
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Price
                </span>
                <span
                  className={`
                  ${currentSize.stats} 
                  text-green-600 dark:text-green-400 
                  font-mono font-semibold
                `}
                >
                  {formatPrice(sticker.price)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { StickerItemProps };
