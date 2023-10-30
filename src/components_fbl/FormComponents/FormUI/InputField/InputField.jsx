import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import styled from '@emotion/styled';
import { FormControl, Stack, TextField } from '@mui/material';
import { ErrorMessage, useField } from 'formik';

const Input = styled(TextField)(({ theme }) => ({}));

function InputField({ error, ...props }) {
  const [field, meta] = useField(props.name);

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack flexDirection="column" gap={1}>
        <Input
          {...field}
          {...props}
          InputProps={{
            sx: {
              color: `${error ? 'pinkPalette.light' : 'primaryColor.black'}`,
            },
          }}
        />
        {meta && meta.error && meta.touched && (
          <ErrorMessage
            name={props.name}
            render={msg => (
              <SubtitleHeading sx={{ color: 'pinkPalette.light' }}>
                {msg}
              </SubtitleHeading>
            )}
          />
        )}
      </Stack>
    </FormControl>
  );
}

export default InputField;
