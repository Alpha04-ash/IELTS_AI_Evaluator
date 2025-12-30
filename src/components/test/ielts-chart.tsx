"use client";

import React from 'react';

interface ChartData {
  type: "BAR" | "LINE" | "PIE" | "TABLE";
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export default function IELTSChart({ data }: { data: ChartData }) {
  const chartHeight = 300;
  const chartWidth = 500;
  const padding = 40;
  
  const allValues = data.datasets.flatMap(d => d.data);
  const maxValue = Math.max(...allValues, 100);
  const minValue = 0;

  const getY = (value: number) => {
    return chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);
  };

  const getX = (index: number) => {
    return padding + (index / (data.labels.length - 1)) * (chartWidth - 2 * padding);
  };

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

  if (data.type === 'BAR') {
    const barWidth = (chartWidth - 2 * padding) / data.labels.length / (data.datasets.length + 0.5);
    
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-center font-bold text-slate-800 mb-6">{data.title}</h3>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => (
            <React.Fragment key={v}>
              <line 
                x1={padding} y1={getY(v)} x2={chartWidth - padding} y2={getY(v)} 
                stroke="#f1f5f9" strokeWidth="1" 
              />
              <text x={padding - 10} y={getY(v)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-400 font-medium">{v}%</text>
            </React.Fragment>
          ))}

          {/* Bars */}
          {data.labels.map((label, i) => (
            <g key={i}>
              {data.datasets.map((dataset, di) => {
                const h = (chartHeight - padding) - getY(dataset.data[i]);
                const x = padding + i * ((chartWidth - 2 * padding) / data.labels.length) + di * barWidth + barWidth/2;
                return (
                  <rect 
                    key={di}
                    x={x}
                    y={getY(dataset.data[i])}
                    width={barWidth}
                    height={h}
                    fill={colors[di]}
                    rx="2"
                  />
                );
              })}
              <text 
                x={padding + (i + 0.5) * ((chartWidth - 2 * padding) / data.labels.length)} 
                y={chartHeight - padding + 20} 
                textAnchor="middle" 
                className="text-[10px] fill-slate-500 font-bold"
              >
                {label}
              </text>
            </g>
          ))}
          
          {/* Axis */}
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          {data.datasets.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></div>
              <span className="text-xs font-bold text-slate-600">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.type === 'LINE') {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-center font-bold text-slate-800 mb-6">{data.title}</h3>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
           {/* Grid lines */}
           {[0, 2000, 4000, 6000, 8000, 10000].map(v => (
            <React.Fragment key={v}>
              <line 
                x1={padding} y1={getY(v)} x2={chartWidth - padding} y2={getY(v)} 
                stroke="#f1f5f9" strokeWidth="1" 
              />
              <text x={padding - 10} y={getY(v)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-400 font-medium">{v}</text>
            </React.Fragment>
          ))}

          {/* Lines */}
          {data.datasets.map((dataset, di) => {
            const points = dataset.data.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
            return (
              <polyline 
                key={di}
                points={points}
                fill="none"
                stroke={colors[di]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Points */}
          {data.datasets.map((dataset, di) => (
            <g key={di}>
              {dataset.data.map((v, i) => (
                <circle key={i} cx={getX(i)} cy={getY(v)} r="4" fill="white" stroke={colors[di]} strokeWidth="2" />
              ))}
            </g>
          ))}

          {/* Labels */}
          {data.labels.map((label, i) => (
            <text 
              key={i}
              x={getX(i)} 
              y={chartHeight - padding + 20} 
              textAnchor="middle" 
              className="text-[10px] fill-slate-500 font-bold"
            >
              {label}
            </text>
          ))}

          {/* Axis */}
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#cbd5e1" strokeWidth="2" />
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          {data.datasets.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></div>
              <span className="text-xs font-bold text-slate-600">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div>Chart type not supported yet.</div>;
}
