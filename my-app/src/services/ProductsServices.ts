import { Paginated } from "../interfaces";
import { Api } from "../providers/api";
import { useState } from "react";
import { iProductsList } from "../interfaces/iProductsList";



    export class ProductService {
        async getAll(): Promise<Paginated<iProductsList>> {
            return await Api.get('Products?page=1&entries=5')
                .then(response => {
                    return response.data;
                }).catch(error => {
                    return error;
                });
        }
    }