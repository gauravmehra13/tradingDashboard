export default function StrategyDetailsCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Strategy Details
      </h3>
      <div className="prose dark:prose-invert text-gray-900 dark:text-white">
        <p className="italic">
          This dashboard implements a Moving Average Crossover strategy for
          BTC/USDT:
        </p>
        <ul className="list-disc list-inside">
          <li>Short-term MA Period: 5</li>
          <li>Long-term MA Period: 20</li>
          <li>Buy Signal: Short MA crosses above Long MA</li>
          <li>Sell Signal: Short MA crosses below Long MA</li>
        </ul>
      </div>
    </div>
  );
}
