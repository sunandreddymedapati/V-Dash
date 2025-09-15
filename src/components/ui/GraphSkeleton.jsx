import React from 'react';

function GraphSkeleton() {
  return (
    <div className="w-full h-[320px] border border-gray-100 rounded-xl bg-white p-4">
      <div className="h-6 w-40 bg-gray-200 rounded mb-3 animate-pulse" />
      <div className="h-full w-full bg-gray-50 rounded relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-gray-200" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-end gap-3 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-6 bg-gray-200 rounded animate-pulse"
              style={{ height: `${10 + (i % 5) * 12}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraphSkeleton;