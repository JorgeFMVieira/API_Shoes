import { Paginated } from "../interfaces";
import { Api } from "../providers/api";
import { useState } from "react";
import { iProductsList } from "../interfaces/iProductsList";
import { useEffect } from "react";



    export class ProductService {
        async getAll(page: number, entries: number): Promise<Paginated<iProductsList>> {
            return await Api.get('Products?page=' + page + '&entries=' + entries)
                .then(response => {
                    return response.data;
                }).catch(error => {
                    return error;
                });
        }
    }