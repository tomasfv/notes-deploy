interface EmptyCardProps {
  onClick: () => void;
}

const EmptyCard = ({ onClick }: EmptyCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-48 bg-white border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-400 group-hover:text-blue-600 transition-colors mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <span className="text-sm text-blue-500 group-hover:text-blue-700 font-medium transition-colors">
        New Note
      </span>
    </button>
  );
};

export default EmptyCard;
