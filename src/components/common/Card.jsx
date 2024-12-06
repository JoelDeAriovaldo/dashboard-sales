import React from "react";
import PropTypes from "prop-types";

const Card = ({
  title,
  subtitle,
  children,
  footer,
  actions,
  variant = "default",
  className = "",
  noPadding = false,
}) => {
  const variantStyles = {
    default: "bg-white dark:bg-gray-800",
    outlined: "border border-gray-200 dark:border-gray-700 bg-transparent",
    elevated: "bg-white dark:bg-gray-800 shadow-lg",
  };

  return (
    <div
      className={`
        rounded-lg 
        ${variantStyles[variant]}
        ${!noPadding ? "p-6" : ""}
        ${className}
      `}
    >
      {/* Cabeçalho do Card */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Corpo do Card */}
      <div className={`${title || subtitle ? "" : "mt-0"}`}>{children}</div>

      {/* Rodapé do Card */}
      {(footer || actions) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {footer && <div>{footer}</div>}
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(["default", "outlined", "elevated"]),
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default Card;
