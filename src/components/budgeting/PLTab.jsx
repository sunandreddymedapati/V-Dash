import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PLTab = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-md border border-gray-100">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">P&L Tab</h2>
            <p className="text-gray-600">P&L content will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PLTab;
