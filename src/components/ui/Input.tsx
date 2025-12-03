import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = `
    block w-full px-3 py-2 border rounded-brand shadow-sm
    placeholder-text-muted
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    ${error 
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
      : 'border-secondary-300 text-text-primary'
    }
    ${className}
  `;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-text-muted">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const textareaClasses = `
    block w-full px-3 py-2 border rounded-brand shadow-sm
    placeholder-text-muted
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    ${error 
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
      : 'border-secondary-300 text-text-primary'
    }
    ${className}
  `;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-text-muted">{helperText}</p>
      )}
    </div>
  );
};
