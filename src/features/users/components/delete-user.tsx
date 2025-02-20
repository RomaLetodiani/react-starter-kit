import { useDeleteUser } from '../api/delete-user';

import { Button } from '@/components/ui/common/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useTeams } from '@/features/teams/api/get-teams';
import { useUser } from '@/lib/auth';
import { logger } from '@/utils/logger';

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const user = useUser();
  const teams = useTeams();
  logger.info(teams);
  const { addNotification } = useNotifications();
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'User Deleted',
        });
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={<Button variant="destructive">Delete</Button>}
      confirmButton={
        <Button isLoading={deleteUserMutation.isPending} type="button" variant="destructive" onClick={() => deleteUserMutation.mutate({ userId: id })}>
          Delete User
        </Button>
      }
    />
  );
};
