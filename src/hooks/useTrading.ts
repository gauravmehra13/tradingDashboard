import { useState, useEffect, useRef } from "react";
import { Trade, TradingData } from "../types/interfaces/dashboard";

export function useTrading(
  symbol: string = "btcusdt",
  shortPeriod: number = 5,
  longPeriod: number = 20
) {
  const [data, setData] = useState<TradingData>({
    currentPrice: 0,
    shortMA: 0,
    longMA: 0,
    signal: "hold",
    trades: [],
  });

  const wsRef = useRef<WebSocket | null>(null);
  const tradesRef = useRef<Trade[]>([]);
  const lastShortMARef = useRef<number>(0);
  const lastLongMARef = useRef<number>(0);
  const lastSignalRef = useRef<"buy" | "sell" | "hold">("hold");
  const lastTimestampRef = useRef<number>(0);

  const calculateMA = (period: number, tradeData: Trade[]) => {
    if (tradeData.length < period) return 0;
    const prices = tradeData.slice(-period).map((trade) => trade.price);
    return prices.reduce((sum, price) => sum + price, 0) / period;
  };

  const updateSignal = (shortMA: number, longMA: number) => {
    const prevShortMA = lastShortMARef.current;
    const prevLongMA = lastLongMARef.current;

    lastShortMARef.current = shortMA;
    lastLongMARef.current = longMA;

    if (prevShortMA <= prevLongMA && shortMA > longMA) {
      lastSignalRef.current = "buy";
      return "buy";
    }
    if (prevShortMA >= prevLongMA && shortMA < longMA) {
      lastSignalRef.current = "sell";
      return "sell";
    }

    if (shortMA === longMA) {
      return "hold";
    }

    return lastSignalRef.current;
  };

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@trade`
    );
    wsRef.current = ws;

    ws.onopen = () => console.log(`WebSocket opened for ${symbol}`);
    ws.onerror = (error) => console.error(`WebSocket error:`, error);
    ws.onclose = () => console.log(`WebSocket closed for ${symbol}`);

    ws.onmessage = (event) => {
      try {
        const tradeData = JSON.parse(event.data);
        const timestamp = tradeData.T;

        if (timestamp <= lastTimestampRef.current) return;
        lastTimestampRef.current = timestamp;

        const trade: Trade = {
          price: parseFloat(tradeData.p),
          timestamp,
        };

        tradesRef.current = [...tradesRef.current.slice(-99), trade].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        const shortMA = calculateMA(shortPeriod, tradesRef.current);
        const longMA = calculateMA(longPeriod, tradesRef.current);

        const signal = updateSignal(shortMA, longMA);

        setData({
          currentPrice: trade.price,
          shortMA,
          longMA,
          signal,
          trades: tradesRef.current,
        });
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    return () => wsRef.current?.close();
  }, [symbol, shortPeriod, longPeriod]);

  return data;
}
