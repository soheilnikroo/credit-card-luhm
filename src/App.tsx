import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { ModeToggle } from './components/theme-toggle';

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv2, setCvv2] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value);
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpireDate(value.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim());
    }
  };

  const handleCvv2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv2(value);
  };

  return (
    <div
      className={
        'w-screen h-screen flex flex-col pt-10  p-6 space-y-8 transition-all  dark:bg-gray-900 dark:text-white bg-white text-gray-900'
      }
    >
      <div>
        <ModeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Credit Card Validator</h1>
        <p className="text-lg opacity-80">
          Please enter your credit card information
        </p>
      </div>
      <div className="mx-auto">
        <Card
          className={`mb-10 relative overflow-hidden h-56 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105`}
        >
          <CardContent className="h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <CreditCard className="w-12 h-12" />
              <div className="text-right">
                <p className="text-xs opacity-80">Expiration Date</p>
                <p className="font-bold">{expireDate || 'MM/YY'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl tracking-wider">
                {cardNumber
                  .padEnd(16, '•')
                  .replace(/(.{4})/g, '$1 ')
                  .trim()}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs opacity-80">Card Holder</p>
                  <p className="font-semibold">{cardHolder || 'FULL NAME'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">CVV2</p>
                  <p className="font-bold">{cvv2.padEnd(3, '•')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={16}
              className="transition dark:text-white border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardHolder">Card Holder</Label>
            <Input
              id="cardHolder"
              placeholder="Full Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              className="transition dark:text-white border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expireDate">Expiration Date</Label>
              <Input
                id="expireDate"
                placeholder="MM/YY"
                value={expireDate}
                onChange={handleExpireDateChange}
                maxLength={5}
                className="transition dark:text-white border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv2">CVV2</Label>
              <Input
                id="cvv2"
                placeholder="123"
                value={cvv2}
                onChange={handleCvv2Change}
                maxLength={3}
                className="transition dark:text-white border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-lg transition-all transform hover:scale-105">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
