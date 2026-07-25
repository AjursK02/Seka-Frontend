interface Props {
  children: React.ReactNode;
}

const GradientText = ({ children }: Props) => {
  return (
    <span
      className="bg-gradient-to-r from-red-700 to-red-400 bg-clip-text text-transparent"
    >
      {children}
    </span>
  );
};

export default GradientText;