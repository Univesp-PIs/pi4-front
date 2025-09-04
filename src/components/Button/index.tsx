import clsx from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'success'
  isLoading?: boolean
  widthFull?: boolean
  title?: string
}

const VARIANT_CLASSES = {
  primary: 'bg-secondary text-white hover:bg-green-500',
  success: 'bg-green-500 text-white hover:bg-green-700',
  error: 'bg-red-500 text-white hover:bg-red-700',
  secondary: 'border bg-transparent hover:bg-green-500 hover:text-white',
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      variant = 'secondary',
      isLoading = false,
      title,
      widthFull,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'px-4 py-2 rounded-md font-bold text-center flex justify-center duration-100'
    const variantClasses = VARIANT_CLASSES[variant] || ''
    const loadingClasses = isLoading
      ? 'cursor-not-allowed opacity-50'
      : 'cursor-pointer'
    const fullWidthClasses = widthFull ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses,
          loadingClasses,
          fullWidthClasses,
          className, // Allow for custom classes to be passed in
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <BiLoaderAlt
            className="animate-spin duration-500 text-white"
            size={25}
          />
        ) : (
          title || children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
