import React from 'react';
import { format } from 'date-fns';

const PortfolioSummaryHeader = ({
  selectedDate,
  selectedSegment,
  segments
}) => {
  // Get segment label from segments array
  const getSegmentLabel = () => {
    if (!selectedSegment || !segments) return 'All Segments';
    const segment = segments.find(s => s.value === selectedSegment);
    return segment ? segment.label : 'All Segments';
  };

  // Format date for display
  const getFormattedDate = () => {
    if (!selectedDate) return format(new Date(), 'MMM dd, yyyy');
    return format(selectedDate, 'MMM dd, yyyy');
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Summary</h1>
      <p className="text-sm text-muted-foreground">
        Showing data for {getFormattedDate()} • {getSegmentLabel()}
      </p>
    </div>
  );
};

export default PortfolioSummaryHeader;
