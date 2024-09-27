import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ModeToggle } from './components/theme-toggle';

const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, 'Card number must be 16 digits')
    .max(16, 'Card number must be 16 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  cardHolder: z.string().min(2, 'Name must be at least 2 characters'),
  expireDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'Expiration date must be in MM/YY format'
    ),
  cvv2: z
    .string()
    .min(3, 'CVV2 must be 3 digits')
    .max(3, 'CVV2 must be 3 digits')
    .regex(/^\d{3}$/, 'CVV2 must be 3 digits'),
});

type CreditCardFormData = z.infer<typeof creditCardSchema>;

export default function CreditCardValidator() {
  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expireDate: '',
      cvv2: '',
    },
  });

  const onSubmit = (data: CreditCardFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="w-screen h-screen flex flex-col pt-10 p-6 space-y-8 transition-all dark:bg-gray-900 dark:text-white bg-white text-gray-900">
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
        <Card className="mb-10 relative overflow-hidden h-56 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
          <CardContent className="h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <CreditCard className="w-12 h-12" />
              <div className="text-right">
                <p className="text-xs opacity-80">Expiration Date</p>
                <p className="font-bold">
                  {form.watch('expireDate') || 'MM/YY'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl tracking-wider">
                {form
                  .watch('cardNumber')
                  .padEnd(16, '•')
                  .replace(/(.{4})/g, '$1 ')
                  .trim()}
              </p>
              <div className="flex justify-between items-center">
                <div className="me-5">
                  <p className="text-xs opacity-80">Card Holder</p>
                  <p className="font-semibold">
                    {form.watch('cardHolder') || 'FULL NAME'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">CVV2</p>
                  <p className="font-bold">
                    {form.watch('cvv2').padEnd(3, '•')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...field}
                      maxLength={16}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="expireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} maxLength={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cvv2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV2</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} maxLength={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-lg transition-all transform hover:scale-105"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
