import { iProducts } from "../../interfaces";

type TableProps = {
    items: iProducts[];
}

export const Table: React.FC<TableProps> = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <ul key={index}>
                    <li>{item.name}</li>
                </ul>
            ))};
        </div>
    );
}