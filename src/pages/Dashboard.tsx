import { useTrading } from "../hooks/useTrading";
import TradingChart from "../components/TradingChart";
import PriceCard from "../components/Dashboard/PriceCard";
import MovingAveragesCard from "../components/Dashboard/MovingAveragesCard";
import SignalCard from "../components/Dashboard/SignalCard";
import StrategyDetailsCard from "../components/Dashboard/StrategyDetailsCard";

export default function Dashboard() {
  const { currentPrice, shortMA, longMA, signal, trades } = useTrading();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="mt-16 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PriceCard title="Current Price" value={formatPrice(currentPrice)} />
        <MovingAveragesCard
          shortMA={formatPrice(shortMA)}
          longMA={formatPrice(longMA)}
        />
        <SignalCard signal={signal} />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Price Chart
        </h3>
        <TradingChart trades={trades} shortMA={shortMA} longMA={longMA} />
      </div>

      <StrategyDetailsCard />
    </div>
  );
}
