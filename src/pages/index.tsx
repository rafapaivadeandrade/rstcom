import React, { useRef, useCallback } from 'react';
import { MainGrid, LogoContainer, Login } from '../components/MainGrid';
import Input from '../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { useRouter } from 'next/router';

interface SignInFormData {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const handlesubmit = useCallback(async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/auth`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const { user, token } = response.data;

      localStorage.setItem('user', user);
      localStorage.setItem('token', token);

      router.push(`/edit/${user._id}`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        toast.error('Falha ao fazer login.');
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
        <h1>Faça seu login</h1>
        <Form onSubmit={handlesubmit} ref={formRef}>
          <Input type="text" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />

          <button>ENTRAR</button>
        </Form>

        <Link href="/register">Não possuo cadastro</Link>
      </Login>
    </MainGrid>
  );
}
