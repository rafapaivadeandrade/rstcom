import React, { useRef, useCallback } from 'react';
import { MainGrid, LogoContainer, Login } from '../../components/MainGrid';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';
interface SignInFormData {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
}

export default function Register() {
  const { register } = useUser();
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const handlesubmit = useCallback(async (data: SignInFormData) => {
    try {
      if (data.password !== data.passwordConfirm) {
        toast.error('Senhas precisam ser as mesmas.');
        return;
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        passwordConfirm: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      register(data.name, data.email, data.password);

      router.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        toast.error('Falha ao registrar.');
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <MainGrid>
      <Toaster />
      <LogoContainer>
        <img src="/logo-rstcom-ok-.svg" />
      </LogoContainer>
      <Login>
        <h1>Faça seu Cadastro</h1>
        <Form onSubmit={handlesubmit} ref={formRef}>
          <Input type="text" name="name" placeholder="Nome" />
          <Input type="text" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Senha" />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirmar Senha"
          />

          <button>CADASTRAR</button>
        </Form>

        <Link href="/">Já possuo cadastro</Link>
      </Login>
    </MainGrid>
  );
}
