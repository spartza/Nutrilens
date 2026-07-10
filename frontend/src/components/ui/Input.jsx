import React from 'react';

export const Input = React.forwardRef(({ label, error, icon, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-gray-600">{label}</label>}
      <div className="relative rounded-xl w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-xl">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`block w-full rounded-xl border border-gray-250 py-2.5 px-3 bg-white text-gray-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all ${icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium px-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
