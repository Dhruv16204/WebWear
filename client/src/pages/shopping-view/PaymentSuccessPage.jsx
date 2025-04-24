import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react'; // Assuming you have this icon

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Set a small delay before showing the success message
    setTimeout(() => {
      setShowMessage(true);
    }, 300); // Delay to show success message for a smooth experience
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <Card className="w-full max-w-md p-10 rounded-lg shadow-lg bg-white">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl text-center text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {/* Checkmark Icon with animation */}
          <CheckCircleIcon className="mx-auto mb-4 w-16 h-16 text-green-600 animate-pulse" />

          {showMessage ? (
            <p className="text-xl font-semibold text-green-700">
              Your payment has been successfully processed.
            </p>
          ) : (
            <p className="text-lg text-gray-600">Processing your payment...</p>
          )}
          
          <Button
            className="mt-5 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            onClick={() => navigate("/shop/account")}
          >
            View Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
