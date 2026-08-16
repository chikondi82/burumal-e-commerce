interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'gray';
  text?: string;
}

const Loader = ({ size = 'md', color = 'primary', text }: LoaderProps) => {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const colorStyles = {
    primary: 'border-primary-600 border-t-transparent',
    accent: 'border-accent-600 border-t-transparent',
    gray: 'border-gray-600 border-t-transparent',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeStyles[size]} ${colorStyles[color]}`}
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
