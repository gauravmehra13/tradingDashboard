import { MovingAveragesCardProps } from "../../types/interfaces/dashboard";

export default function MovingAveragesCard({
  shortMA,
  longMA,
}: MovingAveragesCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Moving Averages
      </h3>
      <div className="mt-2 space-y-1 text-gray-900 dark:text-white">
        <p className="text-sm">
          <span className="text-emerald-500">Short MA (5):</span> {shortMA}
        </p>
        <p className="text-sm">
          <span className="text-red-500">Long MA (20):</span> {longMA}
        </p>
      </div>
    </div>
  );
}
