// Input.jsx
import * as React from "react";
import { cn } from "../../utils/utils";
import { Loader2 } from "lucide-react";

const inputSizes = {
  sm: "h-8 text-xs px-2",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

const Input = React.forwardRef((props, ref) => {
  const {
    className,
    type,
    size = "md",
    icon: Icon,
    loading,
    error,
    success,
    ...otherProps
  } = props;

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          <Icon size={size === "sm" ? 14 : size === "md" ? 16 : 20} />
        </div>
      )}

      <input
        type={type}
        className={cn(
          // Base styles
          "w-full rounded-md border transition-all duration-200 ease-in-out",
          "placeholder:text-slate-400 focus:outline-none",

          // Sizes
          inputSizes[size],

          // Icon padding
          Icon && "pl-10",

          // States
          "enabled:hover:border-slate-300",
          "focus:ring-2 focus:ring-offset-1",

          // Error state
          error && "border-red-500 focus:ring-red-200",

          // Success state
          success && "border-green-500 focus:ring-green-200",

          // Loading state
          loading && "opacity-70 cursor-wait",

          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50",

          // Dark mode
          "dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100",
          "dark:placeholder:text-slate-500",
          "dark:focus:ring-offset-slate-900",

          className
        )}
        ref={ref}
        disabled={loading}
        {...otherProps}
      />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="animate-spin" size={16} />
        </div>
      )}

      {/* Success/Error icons */}
      {!loading && (success || error) && (
        <div
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2",
            success && "text-green-500",
            error && "text-red-500"
          )}
        >
          {success ? "✓" : "✕"}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

const SearchInput = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <Input
      ref={ref}
      icon={Search}
      placeholder="Pesquisar..."
      className={cn("pr-10", className)}
      {...otherProps}
    />
  );
});
SearchInput.displayName = "SearchInput";

const LabeledInput = React.forwardRef((props, ref) => {
  const { label, error, className, required, helpText, ...otherProps } = props;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          className={cn(
            "text-sm font-medium text-slate-700",
            "dark:text-slate-300",
            error && "text-red-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {helpText && <span className="text-xs text-slate-500">{helpText}</span>}
      </div>

      <Input
        ref={ref}
        error={error}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
        className={className}
        {...otherProps}
      />

      {error && (
        <p
          id={`${label}-error`}
          className="text-xs text-red-500 mt-1 animate-slide-down"
        >
          {error}
        </p>
      )}
    </div>
  );
});
LabeledInput.displayName = "LabeledInput";

const CurrencyInput = React.forwardRef((props, ref) => {
  const { className, currency = "R$", ...otherProps } = props;

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
        {currency}
      </span>
      <Input
        ref={ref}
        type="number"
        step="0.01"
        min="0"
        className={cn("pl-8", className)}
        {...otherProps}
      />
    </div>
  );
});
CurrencyInput.displayName = "CurrencyInput";

export { Input, SearchInput, LabeledInput, CurrencyInput };
