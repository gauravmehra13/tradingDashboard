import { PriceCardProps } from "../../types/interfaces/dashboard";

export default function PriceCard({ title, value }: PriceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
