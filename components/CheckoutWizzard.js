import React from 'react';

export default function CheckoutWizzard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap font-secondary">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2
           text-center
           ${
             index <= activeStep
               ? 'border-green-700 text-green-700'
               : 'border-gray-400 text-gray-400'
           }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
