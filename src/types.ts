export type ProductType={
    id: string | number;
    name:string;
    shortDescription:string;
    description:string;
    price:number;
    sizes:string[];
    colors:string[];
    images:Record<string,string>;

}


export type ProductsType=ProductType[]

export type CategoryType={
    id:string | number;
    name:string;
    slug:string;
    icon:string;

}


export type CartItemType = ProductType & {
    quantity:number;
    selectedSize:string;
    selectedColor:string

}


export type CartItemsType = CartItemType[];