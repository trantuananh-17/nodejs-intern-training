import * as yup from 'yup';

const bookSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  product: yup.string().required(),
  color: yup.string().required(),
  image: yup.string().required()
});

const updateBookSchema = yup.object().shape({
  name: yup.string(),
  price: yup.number(),
  description: yup.string(),
  product: yup.string(),
  color: yup.string(),
  image: yup.string()
});

export { bookSchema, updateBookSchema };
