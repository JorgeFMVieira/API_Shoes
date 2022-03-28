import React from 'react'
import { iProducts } from '../interfaces';
import { ListTable, ListTableProps } from './ListTable';

type ListProps = {
    products: ListTableProps[];
};

export const Table: React.FC<ListProps> = ({ products }) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => {
                    <tr key={index}>
                        <td>{product.name}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
};