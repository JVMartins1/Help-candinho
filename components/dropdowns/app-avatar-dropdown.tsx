import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronsDownUp, Cog, DoorOpen, LockKeyholeIcon, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppConfigDialog } from '@/components/configuration/app-config-dialog';
import { Dialog } from '@/components/ui/dialog';
import { AppChangePasswordDialog } from '../configuration/app-change-password-dialog';
import { useState } from 'react';

export function AppAvatarDropdown() {
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className="h-14 gap-5 bg-background">
            <Avatar>
              <AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p>Jaime Antunes</p>
              <small>jaimeblumenau@gmail.com</small>
            </div>
            <ChevronsDownUp className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width] min-w-fit bg-background">
          <DropdownMenuItem id="avatar-dropdown-item-profile">
            <User />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem id="avatar-dropdown-item-change-password" onClick={() => setIsChangePasswordOpen(true)}>
            <LockKeyholeIcon />
            Alterar senha
          </DropdownMenuItem>
          <DropdownMenuItem id="avatar-dropdown-item-config" onClick={() => setIsConfigDialogOpen(true)}>
            <Cog />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Logout logic')}>
            <DoorOpen />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isChangePasswordOpen} onOpenChange={() => setIsChangePasswordOpen(!isChangePasswordOpen)}>
        <AppChangePasswordDialog />
      </Dialog>

      <Dialog open={isConfigDialogOpen} onOpenChange={() => setIsConfigDialogOpen(!isConfigDialogOpen)}>
        <AppConfigDialog />
      </Dialog>
    </>
  );
}
