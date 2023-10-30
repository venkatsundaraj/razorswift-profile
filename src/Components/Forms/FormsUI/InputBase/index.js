import { Visibility } from '@mui/icons-material';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { styled, useTheme } from '@mui/material/styles';
import { useField } from 'formik';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,

    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const theme = useTheme();
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'filled',
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <FormControl
      error={mata && mata.touched && mata.error}
      fullWidth
      variant="standard"
      endAdornment={<InputAdornment position="end">kg</InputAdornment>}
    >
      <InputLabel
        required={true}
        error={mata && mata.touched && mata.error}
        shrink
        htmlFor={name}
      >
        {otherProps.label}
      </InputLabel>
      <BootstrapInput
        sx={{
          '& .MuiInputBase-input': {
            borderColor: mata && mata.touched && mata.error ? 'red' : '#ced4da',
            '&:focus': {
              //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
              borderColor:
                mata && mata.touched && mata.error
                  ? 'red'
                  : theme.palette.primary.main,
            },
          },
        }}
        {...configTextfield}
        error={mata && mata.touched && mata.error}
        fullWidth
        id={name}
        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                size="large"
              >
                <Visibility />
              </IconButton>
            </InputAdornment>
          ),
        }}
        // endAdornment={
        //   <InputAdornment position="end">
        //     <IconButton
        //       aria-label="toggle password visibility"
        //       edge="end"
        //       size="large"
        //     >
        //       <Visibility />
        //     </IconButton>
        //   </InputAdornment>
        // }
      />
      {mata && mata.touched && mata.error && (
        <FormHelperText error id={name}>
          {mata.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextfieldWrapper;
