import { ChangePasswordForm } from '@/components/forms/ChangePasswordForm';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

//Necessário adicionar Dialog e DialogTrigger no componente pai para funcionamento sem erros

export function AppChangePasswordDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Alterar senha</DialogTitle>
        <DialogDescription>Altere a senha do usuário.</DialogDescription>
      </DialogHeader>
      <ChangePasswordForm />
    </DialogContent>
  );
}
