'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';

const formSchema = z
  .object({
    senhaAtual: z.string(),
    novaSenha: z.string(),
    repetirSenha: z.string(),
  })
  .superRefine(({ novaSenha, repetirSenha }, ctx) => {
    if (novaSenha !== repetirSenha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['repetirSenha'],
      });
    }
  });

type FormSchemaType = z.infer<typeof formSchema>;

const itens: { item: keyof FormSchemaType; label: string }[] = [
  { item: 'senhaAtual', label: 'Senha atual' },
  { item: 'novaSenha', label: 'Nova senha' },
  { item: 'repetirSenha', label: 'Repetir senha' },
] as const;

export function ChangePasswordForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      repetirSenha: '',
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
              <FormItem className="mt-1">
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input type="password" onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className="mt-10" type="submit">
          Alterar senha
        </Button>
      </form>
    </Form>
  );
}
