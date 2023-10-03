"use client";
import styled from 'styled-components';
import TodoItem from '@/components/TodoItem';
import CustomBtn from '@/components/CustomBtn';
import { useEffect, useState } from 'react';
import { getTodos } from './services/getTodos';
import { deleteTodo } from './services/removeTodo';
import { createTodo } from './services/createTodo';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';


interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const AppWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppHeader = styled.h1`
  // display: flex;
  // justify-content: center;
`;

const AppInput = styled.input`
  width: 350px;
  height: 25px;
  background: #fff;
  margin-bottom: 20px;
  color: #000;
  padding: 10px;
`;

const TodoItemWrapper = styled.div`
  padding: 50px;
`;

const Status = styled.h2`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Home() {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [deletedTodo, setDeletedTodo] = useState(-1);
  const {data, isLoading, isError} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const client = useQueryClient();

  const {mutate: remove} = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      const newArr = todos.filter(item => item.id !== deletedTodo);
      setTodos(newArr);
      console.log(data, 'delete');
      client.invalidateQueries({queryKey: ['todos']});
    }
  });

  const {mutate: create} = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      if (data) {
        setTodos([...todos, data]);
      }
      console.log(data, 'add');
      client.invalidateQueries({queryKey: ['todos']});
    }
  });


  if (isLoading) {
    return <Status>Идет загрузка...</Status>;
  }

  if (isError) {
    return <Status>Произошла ошибка...</Status>;
  }

  const handleInput = (text: string) => {
    setTodoValue(text);
  }

  const handleAddTask = async (todoValue: string) => {
    create(todoValue);
  }

  const handleRemoveTask = async (id: number) => {
    remove(id);
    setDeletedTodo(id);
  }

  return (
    <AppWrapper>
      <AppHeader>TO DO NOW</AppHeader>
      <AppInput type="text" value={todoValue} onChange={(e) => handleInput(e.target.value)} />
      <CustomBtn text='Add task' onClick={() => handleAddTask(todoValue)} />

      <TodoItemWrapper>
        {todos && todos.map((item: ITodo) => {
          return <TodoItem key={item.id} textTask={item.title} handleRemoveTask={() => handleRemoveTask(item.id)} />
        })}
      </TodoItemWrapper>
    </AppWrapper>
  );
}