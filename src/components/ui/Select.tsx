import { forwardRef, SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      error,
      options,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    const selectId = id || name;

    return (
      <div className={clsx('mb-4', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={selectId}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          name={name}
          className={clsx(
            'input',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;