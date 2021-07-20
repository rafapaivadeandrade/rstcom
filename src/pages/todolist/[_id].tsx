import React, { useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import mongoose from 'mongoose';
import toast, { Toaster } from 'react-hot-toast';

import {
  EditGrid,
  SettingsContainer,
  TodoContainer,
  UserContainer,
  Label,
  Email,
  Task,
  Tasks,
  Square,
  Form,
  Container,
  Wrapper,
} from './styles';

export default function TodoList({ user }) {
  const { loadUser, userData, deleteTask, insertTask, logOut } = useUser();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    task: '',
  });

  useEffect(() => {
    loadUser(user);
  }, [userData]);

  async function removeTask(idProps: string) {
    try {
      deleteTask(idProps);
    } catch (error) {
      toast.error('Falha ao registrar.');
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formData.task === '') {
      toast.error('Falha ao registrar.');
      return;
    }
    const id = mongoose.Types.ObjectId();

    insertTask(formData.task, id);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

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
      <TodoContainer>
        <h1>/Todo list</h1>
        <a>Lista de Tarefas</a>

        <Tasks>
          {userData[0]?.todolist.map((task: any) => {
            return (
              <Container key={task.id} done={selectedItems.includes(task.id)}>
                <Task done={selectedItems.includes(task.id)}>
                  <Wrapper
                    done={selectedItems.includes(task.id)}
                    onClick={() => handleSelectItem(task.id)}
                  >
                    <Square done={selectedItems.includes(task.id)} />
                    <span onClick={() => handleSelectItem(task.id)}>
                      {task.todo}
                    </span>
                  </Wrapper>

                  {!selectedItems.includes(task.id) && (
                    <a onClick={() => removeTask(task.id)}>remover</a>
                  )}
                </Task>
              </Container>
            );
          })}
        </Tasks>

        <Form onSubmit={handleSubmit}>
          <input
            name="task"
            type="text"
            placeholder="Escreva aqui sua tarefa..."
            value={formData.task}
            onChange={handleInputChange}
          />
          <button>Salvar</button>
        </Form>
      </TodoContainer>
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
