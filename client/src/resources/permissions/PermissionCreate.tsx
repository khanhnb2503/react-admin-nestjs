import {
  Create,
  SimpleForm,
  TextInput
} from 'react-admin';
import { Card } from "@mui/material";
import { FormValidators } from '../../constants/errors';

export const PermissionCreate = () => {
  return (
    <Card>
      <Create redirect='list' title='Thêm quyền'>
        <SimpleForm>
          <TextInput
            label="Permission name"
            variant="outlined"
            source="name"
            validate={FormValidators.permission}
          />
        </SimpleForm>
      </Create>
    </Card>
  )
}
