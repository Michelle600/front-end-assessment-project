import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import useLocalStorage from 'use-local-storage';
import { TodoContext } from './contexts/TodoContext';
import RequireAuth from './componenets/RequireAuth';
import { AuthContext } from './contexts/AuthContext';

export default function App() {
  const [token, setToken] = useLocalStorage(null);
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="add"
                element={
                  <RequireAuth>
                    <AddTodo />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route
                path="todo/:id"
                element={
                  <RequireAuth>
                    <EditTodo />
                  </RequireAuth>
                }
              />
              <Route
                path="todolist"
                element={
                  <RequireAuth>
                    <TodoList />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </TodoContext.Provider>
  );
}
