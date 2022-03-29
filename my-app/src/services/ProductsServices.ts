import { Paginated } from "../interfaces";
import { Api } from "../providers/api";
import { useState } from "react";
import { iProductsList } from "../interfaces/iProductsList";
import { useEffect } from "react";



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