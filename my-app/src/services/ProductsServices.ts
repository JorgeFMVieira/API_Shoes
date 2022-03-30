import { Paginated } from "../interfaces";
import { Api } from "../providers/api";
import { iProductsList } from "../interfaces/iProductsList";


    export class ProductService {
        async getAll(page: number, entries: number, searchBy: string, search: string): Promise<Paginated<iProductsList>> {
            return await Api.get('Products?page=' + page + '&entries=' + entries + '&searchBy=' + searchBy + '&search=' + search)
                .then(response => {
                    return response.data;
                }).catch(error => {
                    return error;
                });
        }
    }