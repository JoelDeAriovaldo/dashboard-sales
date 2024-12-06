import React from "react";
import PropTypes from "prop-types";

const Loader = ({
  type = "spinner",
  size = "md",
  color = "primary",
  className = "",
}) => {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorStyles = {
    primary: "text-blue-600 dark:text-blue-500",
    secondary: "text-gray-600 dark:text-gray-400",
    success: "text-green-600 dark:text-green-500",
    danger: "text-red-600 dark:text-red-500",
    warning: "text-yellow-600 dark:text-yellow-500",
  };

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <div
            className={`
            animate-spin rounded-full 
            border-4 border-current 
            border-t-transparent 
            ${sizeStyles[size]} 
            ${colorStyles[color]}
            ${className}
          `}
          />
        );

      case "dots":
        return (
          <div className={`flex gap-1 ${className}`}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  rounded-full 
                  animate-pulse 
                  ${colorStyles[color]}
                  ${
                    size === "sm"
                      ? "w-1 h-1"
                      : size === "md"
                      ? "w-2 h-2"
                      : size === "lg"
                      ? "w-3 h-3"
                      : "w-4 h-4"
                  }
                `}
                style={{
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className={`
            animate-pulse rounded-full
            ${sizeStyles[size]}
            ${colorStyles[color]}
            ${className}
          `}
          />
        );

      case "bars":
        return (
          <div className={`flex gap-1 items-end ${className}`}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`
                  animate-pulse 
                  ${colorStyles[color]}
                  ${
                    size === "sm"
                      ? "w-1"
                      : size === "md"
                      ? "w-2"
                      : size === "lg"
                      ? "w-3"
                      : "w-4"
                  }
                `}
                style={{
                  height: `${(i + 1) * 25}%`,
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">{renderLoader()}</div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(["spinner", "dots", "pulse", "bars"]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
  ]),
  className: PropTypes.string,
};

export default Loader;
