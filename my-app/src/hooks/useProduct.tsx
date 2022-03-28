import { useCallback, useState } from "react";
import { iProducts } from "../interfaces";
import { ProductService } from "../services";

export const useProduct = () => {
    const [products, setProducts] = useState<iProducts[]>([]);

    const getProducts = useCallback(async () => {

        const { status, data } = await ProductService.getProducts();

        if(status != 200) throw new Error();

        setProducts(data);
    }, []);

    return {
        products,
        getProducts,
    };
};