'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  receberEmails: z.boolean().default(false),
  receberSms: z.boolean().default(false),
  receberApenasPedidosInscritos: z.boolean().default(false),
});

type FormSchemaType = z.infer<typeof formSchema>;

const itens: { item: keyof FormSchemaType; label: string }[] = [
  { item: 'receberEmails', label: 'Receber Emails?' },
  { item: 'receberSms', label: 'Receber SMS?' },
  { item: 'receberApenasPedidosInscritos', label: 'Receber apenas pedidos inscritos?' },
] as const;

export function UserPreferencesForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receberEmails: false,
      receberSms: false,
      receberApenasPedidosInscritos: false,
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {itens.map((item) => (
          <FormField
            key={item.item}
            control={form.control}
            name={item.item}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{item.label}</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className="mt-10" type="submit">
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
