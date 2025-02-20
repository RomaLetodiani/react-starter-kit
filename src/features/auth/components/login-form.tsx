import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/common/button';
import { paths } from '@/config/paths';
import { useLogin } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      {/* TODO: add form */}
      <Button onClick={() => login.mutate({ email: 'test@test.com', password: 'test' })}>Login</Button>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to={paths.auth.register.getHref(redirectTo)} className="font-medium text-blue-600 hover:text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
