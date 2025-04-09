import SummaryCard from "./SummaryCard";

const FinancialSummary = ({ data }) => {
    const summaryItems = [
      { title: "Total Balance", value: data.totalBalance },
      { title: "Total Exposure", value: `(${data.totalExposure})`, isNegative: true },
      { title: "Available Balance", value: data.availableBalance },
      { title: " Balance", value: data.balance },
      { title: "Total Available Balance", value: data.totalAvailableBalance },
      { title: "Upline P/L", value: data.uplinePL, isNegative: data.uplinePL < 0 },
    ];
  
    return (
      <div className="md:grid md:grid-cols-6 gap-1 mb-6 text-sm">
        {summaryItems.map((item, index) => (
          <SummaryCard key={index} title={item.title} value={item.value} isNegative={item.isNegative} />
        ))}
      </div>
    );
  };

    export default FinancialSummary;