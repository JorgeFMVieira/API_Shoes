import { Paginated } from "../interfaces/ProductsType/iProductsType";
import { Api } from "../providers/api";
import { iProductsTypeList } from "../interfaces/ProductsType/iProductsTypeList";
    export class ProductTypeService {
        async getAll(page: number, entries: number, search: string): Promise<Paginated<iProductsTypeList>> {
            return await Api.get('ProductType?page=' + page + '&entries=' + entries + '&search=' + search)
                .then(response => {
                    return response.data;
                }).catch(() => {
                    window.location.replace('http://localhost:3000/ApiError');
                });
        }
    }