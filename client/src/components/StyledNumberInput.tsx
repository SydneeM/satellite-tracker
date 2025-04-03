import { TextField } from '@mui/material';

interface StyledNumberInputProps {
  value: number;
  valueSetter: React.Dispatch<React.SetStateAction<number>>;
  label: string;
}

export default function StyledNumberInput({ value, valueSetter, label }: StyledNumberInputProps) {
  return (
    <TextField
      sx={{
        '& .MuiOutlinedInput-root': {
          color: '#f0f0f0',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f0f0f0'
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#aad3df',
            },
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#aad3df',
            },
          }
        },
        '& .MuiInputLabel-outlined': {
          color: '#f0f0f0',
          '&.Mui-focused': {
            color: '#aad3df'
          }
        }
      }}
      value={value}
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueSetter(Number(e.target.value))}
    />
  );
}
