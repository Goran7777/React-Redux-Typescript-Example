import * as React from 'react';
import { connect } from 'react-redux';
import { ITodo, fetchTodos, deleteTodo } from '../actions';
import { IStoreState } from '../reducers';

interface IAppProps {
  todos: ITodo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface IAppState {
  fetching: boolean;
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      fetching: false
    };
  }
  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  componentDidUpdate(prevProps: IAppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: ITodo, index) => (
      <p onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
        {todo.title}
      </p>
    ));
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  render() {
    return (
      <div>
        <h1>Hello from App</h1>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? <h3>Loading . . .</h3> : undefined}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: IStoreState): { todos: ITodo[] } => ({
  todos
});

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App);
