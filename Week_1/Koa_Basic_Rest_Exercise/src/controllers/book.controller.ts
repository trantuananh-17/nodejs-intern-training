import { Context } from 'koa';
import { bookRepository } from '../databases/repositories/book.repository';
import { ICreateBookDto } from '../databases/interfaces/book.interface';

class BookController {
  public async getBooks(ctx: Context) {
    try {
      const { page = 1, limit = 10, sort = 'desc' } = ctx.query;

      const res = await bookRepository.getAllBooks(Number(page), Number(limit), sort as 'asc' | 'desc');

      const { data, total, totalPage, currentPage } = res;

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data,
        total,
        totalPage,
        currentPage
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        data: [],
        error: err.message
      };
    }
  }

  public async getBookById(ctx: Context) {
    try {
      const bookId = Number(ctx.params.bookId);

      const book = await bookRepository.getBookById(bookId);

      let result = book;
      if (ctx.query.fields) {
        const fields = String(ctx.query.fields).split(',');

        result = Object.fromEntries(Object.entries(book).filter(([key]) => fields.includes(key)));
      }

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: result
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async createBook(ctx: Context) {
    try {
      const bookData = ctx.request.body;

      const res = await bookRepository.createBook(bookData as ICreateBookDto);

      ctx.status = 201;
      return (ctx.body = {
        success: true,
        data: res,
        message: 'Book created successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async updateBook(ctx: Context) {
    try {
      const bookId = Number(ctx.params.bookId);
      const bookData = ctx.request.body;

      const res = await bookRepository.updateBook(bookId, bookData as ICreateBookDto);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: res,
        message: 'Book updated successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async deleteBook(ctx: Context) {
    try {
      const bookId = Number(ctx.params.bookId);

      await bookRepository.deleteBook(bookId);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      const err = error as Error;

      ctx.status = 404;
      ctx.body = {
        success: false,
        error: err.message
      };
    }
  }

  public async renderProductsPage(ctx: Context) {
    const products = await bookRepository.getAllBooks(1, 15, 'desc');

    await ctx.render('pages/products', { products: products.data });
  }

  public async renderProductInfoPage(ctx: Context) {
    const bookId = Number(ctx.params.bookId);
    const product = await bookRepository.getBookById(bookId);

    await ctx.render('pages/product-info', { product });
  }
}

export const bookController = new BookController();
