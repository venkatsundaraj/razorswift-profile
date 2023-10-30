import { FormControl, Stack, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useField, useFormikContext } from 'formik';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('@/reUsableComponents/RichTextEditor/Editor'),
  { ssr: false }
);

const CkEditorForm = ({
  name,
  readOnly,
  label,
  value,
  placeHolder,
  textLabelStyle,
  onChange,
  options,
  otherProps,
  multiple,
  labelNotRequired,
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack spacing={1.5} direction="column">
        {!labelNotRequired && (
          <Typography
            sx={{
              margin: 0.2,
              mb: 1,
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '19.8px',
              ...textLabelStyle,
              color: meta.touched && meta.error ? '#f44336' : '#434343',
            }}
          >
            {label} {otherProps?.required ? '*' : ''}
          </Typography>
        )}

        <Editor
          value={values[name] || ''}
          setFieldValue={val => setFieldValue(name, val)}
          onChange={e => {
            setFieldValue(name, e.target.value);
          }}
        />
      </Stack>

      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-selectValuesId">
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CkEditorForm;
