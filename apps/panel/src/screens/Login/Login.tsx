import { useForm } from 'react-hook-form';
import { Box, Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import banner from '../../assets/images/banner.png';
import Input from '../../components/Input/Input';
import useAlert from '../../hooks/useAlert';
import { trpc } from '../../utils/trpc';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Usuário é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

type LoginRequest = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });
  const alert = useAlert();

  const loginMutation = trpc.user.login.useMutation({
    onError(error) {
      alert.error(error.message);
    },
    onSuccess(data) {
      localStorage.setItem('accessToken', data.jwt);
      window.location.assign('/dashboard');
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" width={370}>
        <Box>
          <img width={250} src={banner} />
        </Box>
        <Box width="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3}>
              <Input {...register('username')} label="Usuário" fieldError={errors.username} />
              <Input {...register('password')} type="password" label="Senha" fieldError={errors.password} />
              <Button isLoading={loginMutation.isLoading} type="submit" width="100%" textTransform="uppercase">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
