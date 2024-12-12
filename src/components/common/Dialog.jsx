import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utils/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const dialogSizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw]",
};

const DialogPortal = ({ className, ...props }) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = "DialogPortal";

const DialogOverlay = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        // Base styles
        "fixed inset-0 z-50",
        // Background and blur
        "bg-black/80 backdrop-blur-sm",
        // Animations
        "transition-all duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        // Custom animation timing
        "data-[state=open]:duration-300 data-[state=closed]:duration-200",
        className
      )}
      {...otherProps}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    size = "md",
    showClose = true,
    ...otherProps
  } = props;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Base styles
          "fixed left-[50%] top-[50%] z-50",
          "w-full translate-x-[-50%] translate-y-[-50%]",
          // Sizing
          "p-6 shadow-xl",
          dialogSizes[size],
          // Visual styles
          "border bg-white dark:bg-gray-800 rounded-lg",
          // Animations
          "transition-all duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2",
          "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]",
          // Focus ring
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          // Custom animation timing
          "data-[state=open]:duration-300 data-[state=closed]:duration-200",
          className
        )}
        {...otherProps}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className={cn(
              // Position
              "absolute right-4 top-4",
              // Visual styles
              "rounded-sm opacity-70 ring-offset-white transition-opacity",
              "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
              "disabled:pointer-events-none",
              // Dark mode
              "dark:ring-offset-slate-950 dark:focus:ring-slate-300"
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      "mt-6 pt-4 border-t",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-slate-900",
        "dark:text-slate-50",
        className
      )}
      {...otherProps}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-slate-500", "dark:text-slate-400", className)}
      {...otherProps}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
