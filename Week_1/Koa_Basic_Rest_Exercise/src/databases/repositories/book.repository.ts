import { readData, writeDataToFile } from '../../helpers/file';
import { IBookDto, ICreateBookDto, IUpdateBookDto } from '../interfaces/book.interface';

async function createBook(reqBody: ICreateBookDto) {
  const books = await readData('databases/book.json');

  const bookId = books.length > 0 ? books.length + 1 : 1;
  const book = { id: bookId, ...reqBody, createdAt: new Date().toISOString() };

  const data = [book, ...books];
  await writeDataToFile(data, 'databases/book.json');
  return book;
}

async function updateBook(bookId: number, reqBody: IUpdateBookDto) {
  const books = await readData('databases/book.json');

  const index = books.findIndex((b: IBookDto) => b.id === bookId);

  if (index === -1) {
    throw new Error('Book not found');
  }

  const updatedBook = {
    ...books[index],
    ...reqBody
  };

  books[index] = updatedBook;

  await writeDataToFile(books, 'databases/book.json');
  return books[index];
}

async function getBooks(page: number, limit: number, sort: 'asc' | 'desc') {
  const skip = (page - 1) * limit;

  const data = await readData('databases/book.json');

  if (sort === 'asc') {
    data.sort((a: IBookDto, b: IBookDto) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    data.sort((a: IBookDto, b: IBookDto) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const paginatedData = data.slice(skip, skip + limit);
  const totalPage = Math.ceil(data.length / limit);

  return {
    data: paginatedData,
    total: data.length,
    currentPage: page,
    totalPage
  };
}

async function getBookById(bookId: number) {
  const books = await readData('databases/book.json');

  const index = books.findIndex((b: IBookDto) => b.id === bookId);

  if (index === -1) {
    throw new Error('Book not found');
  }

  return books[index];
}

async function deleteBook(bookId: number) {
  const books = await readData('databases/book.json');

  const book = books.filter((b: IBookDto) => b.id !== bookId);

  await writeDataToFile(book, 'databases/book.json');
}

export const bookRepository = {
  createBook,
  updateBook,
  getBooks,
  getBookById,
  deleteBook
};
