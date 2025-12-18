import "./styles/todo.css";
function Todo({ todo, isCompleted, onUpdateTodo, onDeleteTodo }) {
  return (
    <div className="todo">
      <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.text}
      </p>

      <div className="btn-group">
        {!isCompleted && (
          <button
            onClick={() => {
              onUpdateTodo({ id: todo.id });
            }}
            className="completed"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => onDeleteTodo({ id: todo.id })}
          className="deleted"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
