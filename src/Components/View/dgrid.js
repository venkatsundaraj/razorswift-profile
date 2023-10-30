import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box
      sx={{
        height: 475,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: theme.palette.primary.light,
        },
        overflowY: 'auto',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
    >
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{ notRequired: 'hi' }}
        sx={{
          fontSize: '12px',
        }}
        loading={loading}
        disableSelectionOnClick
        getRowClassName={params => (params.id % 2 === 0 ? 'even' : 'odd')}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export function CustomToolbarMasters(props) {
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
        height: 475,

        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .super-app-theme--header--app': {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      <DataGrid
        {...data}
        // getEstimatedRowHeight={() => 400}
        // getRowHeight={() => 'auto'}
        key={data.rows.length} // Here's the integrated key prop
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
          '& .MuiDataGrid-mainGridContainer': {
            overflowX: 'auto',
            scrollbarWidth: 'thin',
          },
          '& .MuiDataGrid-scrollbar': {
            height: '6px',
          },
          '& .MuiDataGrid-virtualScroller': {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '4px',
              height: '4px',
            },
          },
        }}
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
