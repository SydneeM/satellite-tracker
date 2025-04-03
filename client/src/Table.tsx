import { memo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Satellite } from './App';

interface TableProps {
  sats: Satellite[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Satellite Id', flex: 1 },
  { field: 'name', headerName: 'Satellite Name', flex: 1 },
  { field: 'comments', headerName: 'Comments', flex: 1 }
];

const Table = memo(function Table({ sats }: TableProps) {
  return (
    <div className='h-[30vh] w-[80vw]'>
      <DataGrid
        sx={{
          backgroundColor: '#f0f0f0'
        }}
        rows={sats}
        columns={columns}
      />
    </div>
  );
});

export default Table;
