import * as yup from 'yup';

const updateTodoSchema = yup.object().shape({
  isCompleted: yup.boolean()
});

const createTodoSchema = yup.object().shape({
  text: yup.string()
});

const updateManySchema = yup.object().shape({
  todoIds: yup.array().of(yup.number().required()).required(),
  isCompleted: yup.boolean()
});

const deleteManySchema = yup.object().shape({
  todoIds: yup.array().of(yup.number().required()).required()
});

export { createTodoSchema, updateTodoSchema, updateManySchema, deleteManySchema };
