import { memo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Satellite } from '../App';

interface TableProps {
  sats: Satellite[];
  updateSat: (updatedSat: Satellite) => void;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Satellite Id', flex: 1 },
  { field: 'name', headerName: 'Satellite Name', flex: 1 },
  { field: 'comments', headerName: 'Comments', editable: true, flex: 1 }
];

const Table = memo(function Table({ sats, updateSat }: TableProps) {
  const handleUpdate = (updatedRow: Satellite) => {
    updateSat(updatedRow);
    return updatedRow;
  };

  const handleUpdateError = (error: Error) => {
    console.log('Error updating cell:', error);
  };

  return (
    <div className='h-[30vh] w-[80vw]'>
      <DataGrid
        sx={{
          backgroundColor: '#f0f0f0'
        }}
        rows={sats}
        columns={columns}
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={handleUpdateError}
      />
    </div>
  );
});

export default Table;
