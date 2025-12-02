import { getOne, getAll, add } from "../databases/bookRepository.js";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getAllBooks(ctx) {
  try {
    const books = await getAll();

    console.log(books);

    ctx.body = {
      data: books,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
export async function getBook(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentBook = await getOne(id);
    if (getCurrentBook) {
      return (ctx.body = {
        data: getCurrentBook,
      });
    }

    throw new Error("Book Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function save(ctx) {
  try {
    const postData = ctx.request.body;
    add(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
