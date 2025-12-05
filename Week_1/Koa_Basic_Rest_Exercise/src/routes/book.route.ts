import Router from 'koa-router';
import { validateInput } from '../middlewares/validateInput.middleware';
import { bookSchema, updateBookSchema } from '../databases/schemas/book.schema';
import { bookController } from '../controllers/book.controller';

const bookRoute = new Router();

bookRoute.get('/books', bookController.getBooks);
bookRoute.get('/books/:bookId', bookController.getBookById);
bookRoute.post('/books', validateInput(bookSchema), bookController.createBook);
bookRoute.put('/books/:bookId', validateInput(updateBookSchema), bookController.updateBook);
bookRoute.delete('/books/:bookId', bookController.deleteBook);

bookRoute.get('/products', bookController.renderProductsPage);
bookRoute.get('/product-info/:bookId', bookController.renderProductInfoPage);

export default bookRoute;
