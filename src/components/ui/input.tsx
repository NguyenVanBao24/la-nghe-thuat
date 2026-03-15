import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

// ─── Base input styles ───
const inputBase = [
    "w-full font-sans text-base text-text-primary",
    "bg-white border border-border rounded-sm",
    "px-4 py-2.5 placeholder:text-text-muted",
    "transition-colors duration-150",
    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
    "disabled:opacity-50 disabled:bg-surface disabled:cursor-not-allowed",
].join(" ");

// ─── Input ───
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, className, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="font-sans text-sm font-medium text-text-primary">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        inputBase,
                        error && "border-red-400 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

// ─── Textarea ───
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, className, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="font-sans text-sm font-medium text-text-primary">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    rows={4}
                    className={cn(
                        inputBase,
                        "resize-y min-h-[100px]",
                        error && "border-red-400 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";