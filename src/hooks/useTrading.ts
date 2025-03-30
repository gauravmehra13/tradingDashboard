import { useState, useEffect, useRef } from 'react';
import { Trade, TradingData } from "../types/interfaces/dashboard";

export function useTrading(symbol: string = 'btcusdt', shortPeriod: number = 5, longPeriod: number = 20) {
  const [data, setData] = useState<TradingData>({
    currentPrice: 0,
    shortMA: 0,
    longMA: 0,
    signal: 'hold',
    trades: [],
  });
  const wsRef = useRef<WebSocket | null>(null);
  const tradesRef = useRef<Trade[]>([]);
  const lastTimestampRef = useRef<number>(0);

  const calculateMA = (period: number) => {
    if (tradesRef.current.length < period) return 0;
    const prices = tradesRef.current.slice(-period).map(trade => trade.price);
    return prices.reduce((a, b) => a + b, 0) / period;
  };

  const updateSignal = (shortMA: number, longMA: number, prevShortMA: number, prevLongMA: number) => {
    if (prevShortMA <= prevLongMA && shortMA > longMA) return 'buy';
    if (prevShortMA >= prevLongMA && shortMA < longMA) return 'sell';
    return 'hold';
  };

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`WebSocket connection opened for symbol: ${symbol}`);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error for symbol ${symbol}:`, error);
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for symbol: ${symbol}`);
    };

    ws.onmessage = (event) => {
      try {
        const tradeData = JSON.parse(event.data);
        const timestamp = tradeData.T;

        if (timestamp <= lastTimestampRef.current) {
          return;
        }

        const trade: Trade = {
          price: parseFloat(tradeData.p),
          timestamp,
        };

        lastTimestampRef.current = timestamp;
        
        tradesRef.current = [...tradesRef.current.slice(-99), trade]
          .sort((a, b) => a.timestamp - b.timestamp);

        const shortMA = calculateMA(shortPeriod);
        const longMA = calculateMA(longPeriod);
        const prevShortMA = calculateMA(shortPeriod - 1);
        const prevLongMA = calculateMA(longPeriod - 1);

        setData({
          currentPrice: trade.price,
          shortMA,
          longMA,
          signal: updateSignal(shortMA, longMA, prevShortMA, prevLongMA),
          trades: tradesRef.current,
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol, shortPeriod, longPeriod]);

  return data;
}