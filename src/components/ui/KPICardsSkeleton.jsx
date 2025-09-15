import React from 'react';

const KPICardsSkeleton = ({ cards = 4 }) => {
  const items = Array.from({ length: cards });
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-6 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPICardsSkeleton;