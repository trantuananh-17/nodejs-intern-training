import React from "react";
import "./styles/todoForm.css";

function TodoForm({ onCreateTodo }) {
  const [value, setValue] = React.useState({
    text: "",
  });

  const handleChangeInput = (key, value) => {
    setValue((prevInput) => {
      return {
        ...prevInput,
        [key]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.text.trim() === "") return;
    onCreateTodo(value);
    setValue({
      text: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Thêm todo"
        value={value.text}
        onChange={(e) => handleChangeInput("text", e.target.value)}
      />

      <button className="btn">Gửi</button>
    </form>
  );
}

export default TodoForm;
