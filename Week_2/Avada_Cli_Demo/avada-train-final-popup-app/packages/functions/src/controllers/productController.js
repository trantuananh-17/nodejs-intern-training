import {getCurrentShopData} from '@functions/helpers/auth';
import * as productService from '@functions/services/productService';

export async function getProducts(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const {limit = 30, cursor} = ctx.query;

    const resp = await productService.getProducts(shopData, Number(limit), cursor);
    const {products, hasNext, endCursor} = resp;
    ctx.status = 200;
    ctx.body = {
      status: true,
      data: products,
      pagination: {hasNext},
      endCursor
    };
  } catch (e) {
    console.error(e);
    ctx.status = 404;
    return (ctx.body = {
      success: false
    });
  }
}

export async function getProduct(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const productId = ctx.params.id;

    console.log(productId);

    const product = await productService.getProduct(shopData, productId);
    ctx.status = 200;
    ctx.body = {
      status: true,
      data: product
    };
  } catch (e) {
    console.error(e);
    ctx.status = 404;
    return (ctx.body = {
      success: false
    });
  }
}
