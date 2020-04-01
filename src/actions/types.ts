import { IFetchTodosAction, IDeleteTodoAction } from './todos';

export enum ActionTypes {
  fetchTodos,
  deleteTodo
}

export type Action = IFetchTodosAction | IDeleteTodoAction;
