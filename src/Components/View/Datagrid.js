import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import config from 'config';
import { useState } from 'react';

export function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        '&.MuiDataGrid-toolbarContainer': {
          justifyContent: 'flex-end',
          // gap: 2
        },
        '& .MuiButton-text': {
          fontSize: '14px !important',
        },
      }}
    >
      <GridToolbarExport
        printOptions={{
          disableToolbarButton: true,
          hideFooter: true,
          hideToolbar: true,
        }}
        variant="contained"
        sx={{ m: 1 }}
      />
      <GridToolbarFilterButton variant="contained" sx={{ m: 1 }} />
    </GridToolbarContainer>
  );
}
export function ProfileImage(p) {
  const { value } = p;
  return <Avatar src={`${config.host}${value}`} />;
}

export const CustomDataGrid = props => {
  const { data, loading } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 475,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbarMasters,
        }}
        componentsProps={{
          panel: {
            sx: {
              top: '-120px !important',
            },
          },
        }}
        // sx={{ fontSize: '12px' }}
        loading={loading}
        disableSelectionOnClick
        {...props}
        sx={{
          fontSize: '12px',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
        }}
      />
    </Box>
  );
};

export function CustomToolbarMasters() {
  return (
    <GridToolbarContainer
      sx={{
        '&.MuiDataGrid-toolbarContainer': {
          justifyContent: 'flex-end',
          // gap: 2
        },
        '& .MuiButton-text': {
          fontSize: '14px !important',
        },
      }}
    >
      <GridToolbarFilterButton variant="contained" sx={{ m: 1 }} />
    </GridToolbarContainer>
  );
}

export const CustomDataGridMasters = props => {
  const { data, loading, componentsProps } = props;
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: 475,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .super-app-theme--header--app': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .super-app-theme--Applied': {
          backgroundColor: '#F9F9F9',
        },
        '& .super-app-theme--Shortlist': {
          backgroundColor: '#FFF5EA',
        },
        '& .super-app-theme--InterView': {
          backgroundColor: '#F5F9FF',
        },
        '& .super-app-theme--Offered': {
          backgroundColor: '#CFE2FF',
        },
        '& .super-app-theme--Hired': {
          backgroundColor: '#E0FECC',
        },
      }}
    >
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbarMasters,
          ...componentsProps,
        }}
        componentsProps={{
          panel: {
            sx: {
              top: '-120px !important',
            },
          },
        }}
        sx={{ fontSize: '12px' }}
        loading={loading}
        disableSelectionOnClick
        getRowClassName={params => (params.id % 2 === 0 ? 'even' : 'odd')}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 40, 60, 80, 100]}
      />
    </Box>
  );
};

export const CustomDataGridMastersSelction = props => {
  const { data, loading, componentsProps } = props;
  const theme = useTheme();
  const colors = theme.palette;
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box
      m="40px 0 0 0"
      sx={{
        height: 475,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .super-app-theme--header--app': {
          backgroundColor: theme.palette.primary.light,
        },

        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .name-column--cell': {
          // color: colors.primary[200],
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.primary.light,
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: theme.palette.primary.light,
        },
        '& .MuiCheckbox-root': {
          color: `${colors.orange['dark']}`,
        },
        // '& .MuiCheckbox-disabled': {
        //   color: 'gray !important',
        // },
        '& MuiTablePagination-selectLabel': {
          color: 'white',
        },
        '& .MuiDataGrid-toolbarContainer': {
          // backgroundColor: theme.palette.primary.light,
          color: 'white',
        },
      }}
    >
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbarMasters,
          ...componentsProps,
        }}
        componentsProps={{
          panel: {
            sx: {
              top: '-120px !important',
            },
          },
        }}
        sx={{
          fontSize: '12px',
          '& .MuiCheckbox-root.Mui-disabled': {
            color: 'gray',
          },
        }}
        loading={loading}
        disableSelectionOnClick
        getRowClassName={params => (params.id % 2 === 0 ? 'even' : 'odd')}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 40, 60, 80, 100]}
        {...props}
      />
    </Box>
  );
};
