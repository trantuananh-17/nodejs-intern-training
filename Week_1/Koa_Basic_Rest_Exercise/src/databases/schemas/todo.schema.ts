import * as yup from 'yup';

const updateTodoSchema = yup.object().shape({
  isCompleted: yup.boolean()
});

const createTodoSchema = yup.object().shape({
  text: yup.string()
});

export { createTodoSchema, updateTodoSchema };
