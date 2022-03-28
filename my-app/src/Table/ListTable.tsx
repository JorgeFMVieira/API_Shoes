export type ListTableProps = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    productTypeId: number;
};

export const ListTable: React.FC<ListTableProps> = ({ id, name, description, quantity, price, productTypeId }) => {
    return(
        <div>
            {name}
        </div>
    )
}