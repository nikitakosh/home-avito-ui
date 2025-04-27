import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import LoadingSpinner from './LoadingSpinner';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'btn',
          `btn-${variant}`,
          {
            'btn-sm': size === 'sm',
            'btn-lg': size === 'lg',
            'w-full': fullWidth,
            'opacity-70 cursor-not-allowed': disabled || isLoading,
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <LoadingSpinner size={size === 'lg' ? 'medium' : 'small'} />
            <span className="ml-2">{children}</span>
          </span>
        ) : (
          <span className="flex items-center justify-center">
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;