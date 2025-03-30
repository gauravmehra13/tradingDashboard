export interface PriceCardProps {
  title: string;
  value: string;
}

export interface MovingAveragesCardProps {
  shortMA: string;
  longMA: string;
}

export interface SignalCardProps {
  signal: "buy" | "sell" | "hold";
}

export interface Trade {
  price: number;
  timestamp: number;
}

export interface TradingData {
  currentPrice: number;
  shortMA: number;
  longMA: number;
  signal: "buy" | "sell" | "hold";
  trades: Trade[];
}
export interface TradingChartProps {
  trades: Trade[];
  shortMA: number;
  longMA: number;
}
