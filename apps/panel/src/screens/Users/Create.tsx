import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import FormContainer from '../../components/FormContainer/FormContainer';
import PageTitle from '../../components/PageTitle/PageTitle';
import useAlert from '../../hooks/useAlert';
import { trpc } from '../../utils/trpc';
import UserForm from './components/UserForm';
import { CreateUserRequest, createUserSchema } from './schemas/createUserRequest';

const CreateUserScreen: React.FC = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const form = useForm<CreateUserRequest>({
    resolver: zodResolver(createUserSchema),
  });

  const createUserMutation = trpc.user.create.useMutation({
    onSuccess() {
      alert.success('Usuário criado com sucesso');
      navigate(-1);
    },
    onError(error) {
      alert.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<CreateUserRequest> = data => {
    createUserMutation.mutate(data);
  };

  return (
    <Box>
      <PageTitle title="Novo usuário" backButton />
      <FormContainer>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <UserForm />
            <Flex justifyContent="flex-end" mt={4}>
              <Button type="submit">Enviar</Button>
            </Flex>
          </FormProvider>
        </form>
      </FormContainer>
    </Box>
  );
};

export default CreateUserScreen;
