import { ArrowUp, ArrowDown } from "lucide-react";
import { SignalCardProps } from "../../types/interfaces/dashboard";

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Signal
      </h3>
      <div className="mt-2 flex items-center">
        {signal === "buy" && (
          <div className="flex items-center text-emerald-500">
            <ArrowUp className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">BUY</span>
          </div>
        )}
        {signal === "sell" && (
          <div className="flex items-center text-red-500">
            <ArrowDown className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">SELL</span>
          </div>
        )}
        {signal === "hold" && (
          <span className="text-lg font-semibold text-gray-500">HOLD</span>
        )}
      </div>
    </div>
  );
}
