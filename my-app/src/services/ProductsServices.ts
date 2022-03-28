import { iProducts } from "../interfaces";
import { Api } from "../providers"

const getProducts = () => Api.get<iProducts[]>('Products?page=1&entries=5');

export const ProductService = {
    getProducts,
}