import { memo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Satellite } from './App';

interface TableProps {
  sats: Satellite[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Satellite Id', width: 300 },
  { field: 'name', headerName: 'Satellite Name', width: 300 },
  { field: 'comments', headerName: 'Comments', width: 300 }
];

const Table = memo(function Table({ sats }: TableProps) {
  return (
    <div className='h-[30vh] w-screen'>
      <DataGrid rows={sats} columns={columns} />
    </div>
  );
});

export default Table;
