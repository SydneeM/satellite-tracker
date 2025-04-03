import { Button } from '@mui/material';

interface StyledButtonProps {
  label: string;
  action: () => void;
}

export default function StyledButton({ label, action }: StyledButtonProps) {
  return (
    <Button
      sx={{
        backgroundColor: '#aad3df',
        color: '#1e2024',
        '&:hover': {
          backgroundColor: 'white'
        }
      }}
      onClick={action}
    >
      {label}
    </Button>
  );
}
