import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries, LineSeries, HistogramSeries, HistogramData } from 'lightweight-charts';
import { Maximize, Minimize } from 'lucide-react';
import { CandleData } from '../types/market';

interface ChartPanelProps {
  data: CandleData[];
  loading?: boolean;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data, loading }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [timeframe, setTimeframe] = useState('1m');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#1E2329' },
        horzLines: { color: '#1E2329' },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#707A8A', labelBackgroundColor: '#474D57', style: 2 },
        horzLine: { color: '#707A8A', labelBackgroundColor: '#474D57', style: 2 },
      },
      rightPriceScale: {
        borderColor: '#1E2329',
        autoScale: true,
        alignLabels: true,
      },
      timeScale: {
        borderColor: '#1E2329',
        timeVisible: true,
        secondsVisible: false,
        fixLeftEdge: true,
      },
    });

    const upColor = '#02C076';
    const downColor = '#F6465D';

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor: upColor,
      wickDownColor: downColor,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume', // separate price scale
    });

    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
      borderVisible: false,
    });

    chart.priceScale('right').applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.25, // Give room for volume
      },
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;
    // @ts-ignore
    chartRef.current.volumeSeries = volumeSeries;

    // Apply data immediately if available
    if (data && data.length > 0) {
      updateChartData(data);
    }

    // Add MA Indicator
    const ma5Series = chart.addSeries(LineSeries, {
      color: '#EAB308',
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const ma10Series = chart.addSeries(LineSeries, {
      color: '#6366F1',
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    });

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

    // Update Volume Data
    // @ts-ignore
    const volumeSeries = chartRef.current?.volumeSeries;
    if (volumeSeries) {
      const volumeData: HistogramData[] = uniqueData.map((d, i) => {
        const isUp = i === 0 ? true : (d.close as number) >= (uniqueData[i - 1].close as number);
        return {
          time: d.time,
          value: Math.random() * 1000, // Ideally use d.volume if available from MCP
          color: isUp ? '#02C076' : '#F6465D', // Optimized Bull/Bear colors
        };
      });
      volumeSeries.setData(volumeData);
    }

    // Calculate MA (Simplified Mock)
    // Real implementation would calculate these properly based on the dataset
  };

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      updateChartData(data);
    }
  }, [data, loading]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 z-[2000] bg-[#0B0E11] w-full h-full flex flex-col p-4"
    : "w-full h-full min-h-[400px] bg-[#1E2329] relative overflow-hidden flex flex-col";

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-dark-main animate-pulse">
        <span className="text-dark-muted font-bold tracking-widest text-xs">Loading candles...</span>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {/* Timeframe Selector and Toolbar */}
      <div className="flex items-center justify-between p-2 bg-dark-surface/50 border-b border-dark-border">
        <div className="flex items-center gap-2">
          {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${timeframe === tf ? 'bg-primary text-white' : 'text-dark-muted hover:text-text hover:bg-white/5'
                }`}
            >
              {tf}
            </button>
          ))}
          <div className="w-[1px] h-3 bg-dark-border mx-1" />
          <span className="text-[10px] font-bold text-dark-muted">Indicators</span>
          <button className="text-[10px] font-bold text-primary px-1 hover:underline">MA</button>
          <button className="text-[10px] font-bold text-dark-muted px-1 hover:underline">VOL</button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="text-dark-muted hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </button>
      </div>

      <div className="flex-1 w-full min-h-[360px] relative">
        <div ref={chartContainerRef} className="w-full h-full" />
        {/* Dark Grey Background for Volume area */}
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-[#1E2329]/40 pointer-events-none border-t border-dark-border/20" />
      </div>

      {/* Top Bar Info (Optional Overlay) */}
      <div className="absolute top-12 left-4 z-10 flex gap-4 text-[10px] font-bold bg-dark-main/60 p-1 rounded backdrop-blur-sm pointer-events-none">
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
