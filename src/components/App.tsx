import { useCallback, useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../css/App.css'
import Button from '@mui/material/Button';
import CustomTable from './CustomTable';
import { fetchData, createItem } from '../api/api';
import type { FormField } from '../types';
import * as Yup from 'yup';
import CreateRecordForm from './CreateRecordForm';

function App() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [columns, setColumns] = useState<string[]>([]);

  const formFields: FormField[] = [
    {name: 'name', label: 'Name', type: 'text', validation: Yup.string().required()},
    {name: 'description', label: 'Description', type: 'text'},
    {name: 'price', label: 'Price', type: 'number', validation: Yup.number().min(0).required()},
    {name: 'quantity', label: 'Quantity', type: 'number', validation: Yup.number().integer().min(0)},
    {name: 'category', label: 'Category', type: 'text'},
  ];

  const loadMore = useCallback( async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try{
      const {items, hasMore: more} = await fetchData(page, 10);
      setData(prev => [...prev, ...items]);
      setHasMore(more);
      setPage(prev => prev + 1);

      if (items.length > 0 && columns.length === 0){
        setColumns(Object.keys(items[0]));
      }
    } finally{
      setLoading(false);
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    loadMore();
  }, []);

  const handleSubmit = async (values: any) => {
    const newItem = await createItem(values);
    setData(prev => [newItem, ...prev]);
  }


  return (
    <>
      <div className="app-container">
        <h1>Data Table</h1>
        <CreateRecordForm 
          fields={formFields}
          onSubmit={handleSubmit}
        />

        <CustomTable
          columns={columns}
          data={data}
          loadMore={loadMore}
          hasMore={hasMore}
        />

        {loading && <div className='loading-indicator'>Loading...</div>}
        {hasMore && !loading && (
          <Button
            variant='contained'
            onClick={loadMore}
            sx={{mt: 2}}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  )
}

export default App
