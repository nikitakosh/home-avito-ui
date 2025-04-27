import { forwardRef, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      label,
      error,
      fullWidth = true,
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name;

    return (
      <div className={clsx('mb-4', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          className={clsx(
            'input',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;