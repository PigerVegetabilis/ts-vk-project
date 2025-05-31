import '../css/App.css'
import CustomTable from './CustomTable';
import type { FormField } from '../types';
import * as Yup from 'yup';
import CreateRecordForm from './CreateRecordForm';
import { observer } from 'mobx-react-lite';
import tableStore from '../store/TableStore';

const App = observer(() => {
  const formFields: FormField[] = [
    {name: 'name', label: 'Name', type: 'text', validation: Yup.string().max(15).required()},
    {name: 'description', label: 'Description', type: 'text', validation: Yup.string().max(100)},
    {name: 'price', label: 'Price', type: 'number', validation: Yup.number().min(0).max(100000).required()},
    {name: 'quantity', label: 'Quantity', type: 'number', validation: Yup.number().integer().min(0).max(2025)},
    {name: 'category', label: 'Category', type: 'text', validation: Yup.string().max(40)},
  ];

  return (
    <div className="app-container">
      <h1>Data Table</h1>
      <div className="app-wrapper" style={{display: 'flex', gap: '10px'}}>
        <CreateRecordForm 
        fields={formFields}
        onSubmit={(values) => tableStore.addItem(values)}
        />

        <CustomTable
          columns={tableStore.columns}
          data={tableStore.data}
          loadMore={() => tableStore.loadMore()}
          hasMore={tableStore.hasMore}
          isLoading={tableStore.loading}
        />

        {tableStore.loading && <div className='loading-indicator'>Loading...</div>}
        
      </div>
      
    </div>
  )
})

export default App
