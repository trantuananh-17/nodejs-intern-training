import { writeDataToFile } from './../src/helpers/file';
import { faker } from '@faker-js/faker';

const data = [];

for (let i = 0; i < 1000; i++) {
  data.push({
    id: i + 1,
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    product: faker.commerce.product(),
    color: faker.color.human(),
    createdAt: faker.date.past().toISOString(),
    image: faker.image.urlPicsumPhotos({ width: 600, height: 600 })
  });
}

writeDataToFile(data, 'databases/book.json');

console.log(' Created data.json with 1000 records');
