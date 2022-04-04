export class Paginated<T> {
    currentPage: number;
    entries: number;
    pages: number;
    productType: T[];
    search: string;
    error: boolean;
    order: string;
    errorMsg: string;

    constructor(currentPage: number, entries: number, error: boolean, pages: number, productType: T[], search: string, errorMsg: string, order: string){
        this.currentPage = currentPage;
        this.entries = entries;
        this.error = error;
        this.pages = pages;
        this.productType = productType;
        this.search = search;
        this.errorMsg = errorMsg;
        this.order = order;
    }
}