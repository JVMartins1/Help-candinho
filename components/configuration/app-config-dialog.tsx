import { UserPreferencesForm } from '../forms/UserPreferencesForm';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

//Necessário adicionar Dialog e DialogTrigger no componente pai para funcionamento sem erros

export function AppConfigDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Configurações de usuário</DialogTitle>
        <DialogDescription>Ajuste as configurações para o usuário.</DialogDescription>
      </DialogHeader>
      <UserPreferencesForm />
    </DialogContent>
  );
}
