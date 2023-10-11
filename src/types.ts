export interface IDataIngredients {
  type: string;
  _id: string;
  name: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
}

export interface IOrders {
  createdAt: Date;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: Date;
  _id: string;
}
