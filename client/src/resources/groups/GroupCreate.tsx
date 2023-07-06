import {
  Create,
  SimpleForm,
  TextInput
} from 'react-admin';
import { Card } from "@mui/material";
import { FormValidators } from '../../constants/errors';

export const GroupCreate = () => {
  return (
    <Card>
      <Create redirect='list' title='Thêm groups'>
        <SimpleForm>
          <TextInput
            label="Group name"
            variant="outlined"
            source="name"
            validate={FormValidators.groups}
          />
        </SimpleForm>
      </Create>
    </Card>
  )
}
