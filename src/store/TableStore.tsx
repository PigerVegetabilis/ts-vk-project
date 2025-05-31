import {makeAutoObservable, runInAction} from 'mobx';
import {fetchData, createItem} from '../api/api';

class TableStore{
    data: any[] = [];
    page = 1;
    loading = false;
    hasMore = true;
    columns: string[] = [];

    constructor(){
        makeAutoObservable(this);
    }

    async loadMore(){
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        try{
            const {items, hasMore} = await fetchData(this.page, 10);
            runInAction(() => {
                this.data = [...this.data, ...items];
                this.hasMore = hasMore;
                this.page += 1;

                if (items.length > 0 && this.columns.length === 0) {
                    this.columns = Object.keys(items[0]);
                }
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    async addItem(item: any){
        const newItem = await createItem(item);
        runInAction(() => {
            this.data = [newItem, ...this.data];
        })
    }
}

const tableStore = new TableStore();
export default tableStore;
