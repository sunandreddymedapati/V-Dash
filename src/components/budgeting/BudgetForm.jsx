import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import RevenueTab from './RevenueTab';
import LaborTab from './LaborTab';
import LaborReviewTab from './LaborReviewTab';
import PLTab from './PLTab';
import ReviewTab from './ReviewTab';

const BudgetForm = ({ selectedYear }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'revenue', title: 'Revenue', component: RevenueTab },
    { id: 'labor', title: 'Labor', component: LaborTab },
    { id: 'labor-review', title: 'Labor Review', component: LaborReviewTab },
    { id: 'pl', title: 'P&L', component: PLTab },
    { id: 'review', title: 'Review', component: ReviewTab }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const CurrentComponent = steps[currentStep].component;

  const getNextButtonText = () => {
    if (currentStep === 0 || currentStep === 2 || currentStep === 3) {
      return "Review & Next";
    }
    return "Next";
  };

  const shouldShowBackButton = currentStep > 0;
  const shouldShowNextButton = currentStep < steps.length - 1;

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200",
                    index === currentStep
                      ? "bg-blue-600 text-white shadow-lg"
                      : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  )}
                >
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <div className="ml-3">
                  <p
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      index === currentStep
                        ? "text-blue-600"
                        : index < currentStep
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                    onClick={() => handleStepClick(index)}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-4 rounded-full transition-all duration-200",
                      index < currentStep ? "bg-green-500" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="min-h-[600px]">
        <CurrentComponent selectedYear={selectedYear} />
      </div>

      {/* Navigation Buttons */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {shouldShowBackButton ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </Button>
            ) : (
              <div></div>
            )}

            {shouldShowNextButton && (
              <Button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <span>{getNextButtonText()}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetForm;
