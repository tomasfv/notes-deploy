interface EmptyCardProps {
  onClick: () => void;
}

const EmptyCard = ({ onClick }: EmptyCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-48 bg-white border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center hover:border-zinc-500 hover:bg-zinc-50 transition-all cursor-pointer group"
    >
      <span className="text-4xl text-zinc-300 group-hover:text-zinc-600 transition-colors">
        +
      </span>
    </button>
  );
};

export default EmptyCard;
