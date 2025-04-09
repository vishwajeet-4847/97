const SummaryCard = ({ title, value, isNegative = false }) => {
    return (
      <div className="bg-white p-2 border-t border-l border-r border-gray-300">
        <div className="text-gray-600">{title}</div>
        <div className={`font-bold ${isNegative ? "text-red-600" : "text-black"}`}>
          IRP {value}
        </div>
      </div>
    );
  };

  export default SummaryCard;