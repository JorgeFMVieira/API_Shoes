import Table from '../components/Product/Table/Table';
import './StyleDefault.css';
import CheckRoutes from './Routes/CheckRoutes';

function Products() {

    return (
        <div>
            <CheckRoutes />
            <Table />
        </div>
    )
}

export default Products