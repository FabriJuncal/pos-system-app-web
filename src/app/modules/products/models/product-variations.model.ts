export class ListProductVariationsModel {
  total: number;
  productVariations: {
      data: ProductVariationsModel[],
  }
}

export class ProductVariationsModel {
  id: number;
  colorName: string;
  colorcode: string;
  image: string;
  typeMaterial: string;
  typeSize: string;
  size: string;
  weight: number;
  stock: number;
}
