import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries } from 'lightweight-charts';
import { CandleData } from '../types/market';

interface ChartPanelProps {
  data: CandleData[];
  loading?: boolean;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data, loading }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || loading) return;

    // Cleanup container before initialization
    chartContainerRef.current.innerHTML = '';

    const { clientWidth, clientHeight } = chartContainerRef.current;
    const initialWidth = clientWidth || 300;
    const initialHeight = clientHeight || 400;

    const chart = createChart(chartContainerRef.current, {
      width: initialWidth,
      height: initialHeight,
      layout: {
        background: { type: ColorType.Solid, color: '#0B0E11' },
        textColor: '#848E9C',
      },
      grid: {
        vertLines: { color: 'rgba(43, 49, 57, 0.5)' },
        horzLines: { color: 'rgba(43, 49, 57, 0.5)' },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#6366F1', labelBackgroundColor: '#6366F1' },
        horzLine: { color: '#6366F1', labelBackgroundColor: '#6366F1' },
      },
      rightPriceScale: { borderColor: '#2B3139', autoScale: true },
      timeScale: { borderColor: '#2B3139', timeVisible: true, secondsVisible: false },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00C087',
      downColor: '#FF4D4F',
      borderVisible: false,
      wickUpColor: '#00C087',
      wickDownColor: '#FF4D4F',
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    // Apply data immediately if available
    if (data && data.length > 0) {
      updateChartData(data);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !chartContainerRef.current) return;
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        chart.applyOptions({ width, height });
        chart.timeScale().fitContent();
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [loading]); // Re-init when loading state flips

  const updateChartData = (candleData: CandleData[]) => {
    if (!seriesRef.current) return;

    const formattedData: CandlestickData[] = candleData
      .map(d => {
        let timeValue = typeof d.time === 'string' ? new Date(d.time).getTime() / 1000 : Number(d.time);
        if (timeValue > 10000000000) timeValue = Math.floor(timeValue / 1000);

        return {
          time: timeValue as Time,
          open: Number(d.open),
          high: Number(d.high),
          low: Number(d.low),
          close: Number(d.close),
        };
      })
      .sort((a, b) => (a.time as number) - (b.time as number));

    const uniqueData = formattedData.filter((item, index, self) =>
      index === self.findIndex((t) => t.time === item.time)
    );

    seriesRef.current.setData(uniqueData);
    chartRef.current?.timeScale().fitContent();
  };

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      updateChartData(data);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-dark-main animate-pulse">
        <span className="text-dark-muted font-bold tracking-widest text-xs">Loading candles...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] bg-dark-main relative overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full min-h-[400px]" />

      {/* Top Bar Info (Optional Overlay) */}
      <div className="absolute top-4 left-4 z-10 flex gap-4 text-[10px] font-bold">
        <div className="flex gap-1">
          <span className="text-dark-muted">O</span>
          <span className="text-success">{data[data.length - 1]?.open || 0}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-dark-muted">H</span>
          <span className="text-success">{data[data.length - 1]?.high || 0}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-dark-muted">L</span>
          <span className="text-success">{data[data.length - 1]?.low || 0}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-dark-muted">C</span>
          <span className="text-success">{data[data.length - 1]?.close || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ChartPanel;
