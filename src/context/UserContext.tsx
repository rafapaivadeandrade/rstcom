import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import toast from 'react-hot-toast';

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  todolist: [todo: string, id: string];
};
type UserContextData = {
  userData: User[];
  register: (name: string, email: string, password: string) => void;
  loadUser: (user: User[]) => void;
  deleteTask: (idProps: string) => void;
  insertTask: (todo: string, id: mongoose.Types.ObjectId) => void;
  editUser: (name: string, email: string, password: string, id: string) => void;
  logOut: () => void;
};

export const UserContext = createContext({} as UserContextData);

type UserContextProviderProps = {
  children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userData, setUserData] = useState([]);

  const loadUser = useCallback(
    (user: User[]) => {
      setUserData(user);
    },
    [userData]
  );

  async function insertTask(todo: string, id: mongoose.Types.ObjectId) {
    const userdata = [...userData];

    const updatedUser = userdata.map((user) => {
      user.todolist.push({ todo: todo, id: id });
    });
    setUserData(updatedUser);

    await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/todolist/${userData[0]._id}`,
      {
        list: todo,
        id: id,
      }
    );
    toast.success('Tarefa inserida.');
  }

  async function register(name: string, email: string, password: string) {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user/1`, {
      name,
      email,
      password,
    });
    toast.success('Usuário cadastrado corretamente.');
  }

  async function editUser(
    name: string,
    email: string,
    password: string,
    id: string
  ) {
    await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`, {
      name,
      email,
      password,
    });
    toast.success('Usuário modificado corretamente.');
  }

  async function deleteTask(idProps: string) {
    const userdata = [...userData];
    const indexToDelete = userdata.map((user) =>
      user.todolist.findIndex((t) => t.id === idProps)
    );

    userdata.map((user) => user.todolist.splice(indexToDelete, 1));

    setUserData(userdata);

    await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/api/todolist/${userData[0]._id}`,
      {
        data: {
          id: idProps,
        },
      }
    );
  }

  async function logOut() {
    localStorage.clear();
  }

  return (
    <UserContext.Provider
      value={{
        loadUser,
        register,
        userData,
        deleteTask,
        insertTask,
        editUser,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
