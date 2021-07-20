import React, { useRef, useCallback } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useUser } from '../../context/UserContext';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import {
  EditGrid,
  SettingsContainer,
  EditContainer,
  UserContainer,
  Label,
  Email,
} from '../../components/EditGrid/styles';

interface SignInFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function Edit({ user }) {
  const { editUser, logOut } = useUser();
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const handlesubmit = useCallback(async (data: SignInFormData) => {
    try {
      if (data.password !== data.passwordConfirm) {
        toast.error('Senhas precisam ser as mesmas.');
        return;
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        passwordConfirm: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      editUser(data.name, data.email, data.password, user[0]._id);
      router.push(`/todolist/${user[0]._id}`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        toast.error('Falha ao modificar usuário.');
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <EditGrid>
      <Toaster />
      <SettingsContainer>
        <a>
          <span onClick={logOut}>
            <Link href="/"> Sair</Link>
          </span>
        </a>

        <UserContainer>
          <img src="/mini-logo.svg" />
          <div>
            <Label>{user[0].name}</Label>
            <Email>{user[0].email}</Email>
          </div>
        </UserContainer>
        <div>
          <span>
            <Link href={`/edit/${user[0]._id}`}>Dados Pessoais</Link>
          </span>
          <span>
            <Link href={`/todolist/${user[0]._id}`}>TodoList</Link>
          </span>
        </div>
      </SettingsContainer>
      <EditContainer>
        <h1>/Dados Pessoais</h1>
        <div className="profile">
          <img src="/profile.svg" />
          <a>alterar foto</a>
        </div>
        <Form onSubmit={handlesubmit} ref={formRef}>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={user[0].name}
          />
          <Input
            type="text"
            name="email"
            placeholder="E-mail"
            defaultValue={user[0].email}
          />
          <Input type="password" name="password" placeholder="Senha" />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirmar Senha"
          />

          <button>Editar</button>
        </Form>
      </EditContainer>
    </EditGrid>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query._id as string;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/todolist/${id}`
  );
  const user = response.data;

  return {
    props: user,
  };
};
