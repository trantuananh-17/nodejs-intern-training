import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import useFetchApi from "./hooks/useFetchApi";
import useCreateApi from "./hooks/useCreateApi";
import useUpdateApi from "./hooks/useUpdateApi";
import useDeleteApi from "./hooks/useDeleteApi";

function App() {
  const {
    data,
    setData,
    loading: fetchLoading,
  } = useFetchApi({
    url: "http://localhost:5000/api/v1/todos",
  });

  const { createData } = useCreateApi();

  const { updateData } = useUpdateApi();

  const { deleteData } = useDeleteApi();

  const hanleCreateTodo = async ({ text }) => {
    const todo = await createData({
      url: "http://localhost:5000/api/v1/todos",
      body: { text },
    });
    const newTodos = [todo.data, ...data.data];

    setData({ ...data, data: newTodos });
  };

  const handleUpdateTodo = async ({ id }) => {
    const todo = await updateData({
      url: `http://localhost:5000/api/v1/todos/${id}`,
      body: { isCompleted: true },
    });

    const newTodos = data?.data?.map((item) =>
      item.id === todo?.data?.id ? todo.data : item
    );

    setData({ ...data, data: newTodos });
  };

  const handleDeleteTodo = async ({ id }) => {
    await deleteData({
      url: `http://localhost:5000/api/v1/todos/${id}`,
    });

    const newTodos = data.data.filter((item) => item.id !== id);

    console.log(newTodos);

    setData({ ...data, data: newTodos });
  };

  return (
    <div className="wrap">
      <div className="app">
        <div className="card">
          <TodoForm onCreateTodo={hanleCreateTodo} />

          {data && data?.data?.length > 0 ? (
            <div className="todo-list">
              {!fetchLoading
                ? data &&
                  data?.data?.map((todo, index) => (
                    <Todo
                      key={index}
                      index={index}
                      todo={todo}
                      isCompleted={todo.isCompleted}
                      onUpdateTodo={handleUpdateTodo}
                      onDeleteTodo={handleDeleteTodo}
                    />
                  ))
                : "Loading data...."}
            </div>
          ) : (
            <p className="msg">Không có todo!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
