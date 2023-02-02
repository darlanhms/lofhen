import { useFormContext } from 'react-hook-form';
import { Card, Stack } from '@chakra-ui/react';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import { CreateUserRequest } from '../schemas/createUserRequest';

const UserForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserRequest>();

  return (
    <Stack spacing={4}>
      <Input {...register('name')} label="Nome" fieldError={errors.name} />
      <Input {...register('username')} label="Usuário" fieldError={errors.username} />
      <Input {...register('password')} type="password" label="Senha" fieldError={errors.password} />
      <Select placeholder="Cargo" label="Cargo" {...register('role')} fieldError={errors.role}>
        <option value="ADMIN">Administrador</option>
        <option value="AGENT">Representante</option>
      </Select>
    </Stack>
  );
};

export default UserForm;
