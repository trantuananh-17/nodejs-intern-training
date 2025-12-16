import * as orderRepository from '@functions/repositories/orderRepository';

export async function getLatestOrders(shopData) {
  const orders = await orderRepository.getLatestOrders(shopData);

  return orders.orders.edges.map(edge => {
    const order = edge.node;
    const lineItem = order.lineItems.edges[0]?.node;

    return {
      firstName: order.customer?.firstName ?? null,
      city: order.shippingAddress?.city ?? null,
      country: order.shippingAddress?.country ?? null,
      productName: lineItem?.title ?? null,
      productId: lineItem ? lineItem.id : null,
      timestamp: new Date(order.createdAt),
      productImage: lineItem?.image?.url ?? null
    };
  });
}
