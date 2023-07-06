import { Alert, AlertTitle} from '@mui/material';

export enum TypeAlert {
  ERROR = 'error',
  SUCCESS ='success',
  WARNING = 'warning',
  INFO = 'info'
}

interface Props {
  title: string;
  type: TypeAlert;
  description: string;
}

export const Alerts = (prop: Props) => {
  return (
    <Alert severity={prop.type}>
      <AlertTitle>{prop.title}</AlertTitle>
      <h6>{prop.description}</h6>
    </Alert>
  );
}
