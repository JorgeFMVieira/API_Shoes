export class Paginated<T> {
    currentPage: number;
    entries: number;
    erro: boolean;
    pages: number;
    products: T[];
    search: string;
    searchBy: string;
    order: string;
    success: boolean;

    constructor(currentPage: number, entries: number, erro: boolean, pages: number, products: T[], search: string, searchBy: string, order: string, success: boolean){
        this.currentPage = currentPage;
        this.entries = entries;
        this.erro = erro;
        this.pages = pages;
        this.products = products;
        this.search = search;
        this.searchBy = searchBy;
        this.success = success;
        this.order = order;
    }
}