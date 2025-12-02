export interface IBookDto {
  id: number;
  name: string;
  price: number;
  description: string;
  product: string;
  color: string;
  createdAt: string;
  image: string;
}

export interface ICreateBookDto {
  name: string;
  price: number;
  description: string;
  product: string;
  color: string;
  image: string;
}

export interface IUpdateBookDto extends ICreateBookDto {}
