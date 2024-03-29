import { apiEndpoint } from '../config'
import { Todo } from '../types/Todo';
import { CreateTodoRequest } from '../types/CreateTodoRequest';
import Axios from 'axios'
import { UpdateTodoRequest } from '../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Todo[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  let responseTodos = response.data.items
  let resultTodo: Todo[] = [];
  for (const todo of responseTodos) {
    const updatedTodo: Todo = { 
      ...todo, 
      done: todo.done == 1 ? true : false
    };
    resultTodo.push(updatedTodo);
  }

  return resultTodo
}

// map(todoItem => ({
//   ...todoItem, 
//   done: todoItem.done == 1 ? true : false
// })

export async function getTodosFilter(idToken: string, filter: string): Promise<Todo[]> {
  console.log('Fetching todos filter')

  const response = await Axios.get(`${apiEndpoint}/todos?filter=${filter}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos filter:', response.data)
  return response.data.items
}

export async function getTodosSort(idToken: string, sortByValue: string, sortOrderValue: string): Promise<Todo[]> {
  console.log('Fetching todos filter')

  const response = await Axios.get(`${apiEndpoint}/todos?sortBy=${sortByValue}&sortOrder=${sortOrderValue}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos sort:', response.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> {
  const response = await Axios.post(`${apiEndpoint}/todos`,  JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  todoId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function removeUploadUrl(
  idToken: string,
  todoId: string
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${todoId}/removeUploadUrl`, JSON.stringify(''), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  todoId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/todos/${todoId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
