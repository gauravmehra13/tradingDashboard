import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi } from "lightweight-charts";
import { TradingChartProps } from "../types/interfaces/dashboard";

export default function TradingChart({
  trades,
  shortMA,
  longMA,
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null); 

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (!chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#999",
        },
        grid: {
          vertLines: { color: "rgba(42, 46, 57, 0.1)" },
          horzLines: { color: "rgba(42, 46, 57, 0.1)" },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candleSeries = chartRef.current.addLineSeries({
        color: "#2962FF",
        lineWidth: 2,
      });

      const shortMASeries = chartRef.current.addLineSeries({
        color: "#26a69a",
        lineWidth: 1,
        lineStyle: 1,
      });

      const longMASeries = chartRef.current.addLineSeries({
        color: "#ef5350",
        lineWidth: 1,
        lineStyle: 1,
      });

      chartRef.current.series = {
        candle: candleSeries,
        shortMA: shortMASeries,
        longMA: longMASeries,
      };
    }

    const uniqueTimestamps = new Map();
    const formattedData = trades
      .map((trade) => {
        let time = Math.floor(trade.timestamp / 1000);
        while (uniqueTimestamps.has(time)) {
          time += 1;
        }
        uniqueTimestamps.set(time, true);
        return {
          time,
          value: trade.price,
        };
      })
      .sort((a, b) => a.time - b.time);

    if (formattedData.length > 0) {
      const latestTime = formattedData[formattedData.length - 1].time;

      chartRef.current.series.candle.setData(formattedData);

      if (shortMA > 0) {
        chartRef.current.series.shortMA.setData([
          {
            time: latestTime,
            value: shortMA,
          },
        ]);
      }

      if (longMA > 0) {
        chartRef.current.series.longMA.setData([
          {
            time: latestTime,
            value: longMA,
          },
        ]);
      }
    }

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [trades, shortMA, longMA]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}
