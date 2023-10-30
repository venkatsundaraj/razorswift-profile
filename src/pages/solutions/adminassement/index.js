import MainCard from '@/cardComponents/MainCard';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import renderCellExpand from '@/view/CellExpand';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip, Typography } from '@mui/material';
import config from 'config';
import Link from 'next/link';
import { useState } from 'react';

function AdminAssessment() {
  function CustomNoRowsOverlay() {
    return (
      <Typography variant="h6" align="center" sx={{ fontSize: '15px' }} mt={18}>
        No Records Found
      </Typography>
    );
  }
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });
  const columns = [
    {
      field: 'slno',
      headerName: 'Sl no',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.id,
      sortable: false,
      filterable: false,
    },
    {
      field: 'title',
      headerName: ' Title',
      minWidth: 150,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'platform',
      headerName: ' Platform',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'skills',
      headerName: ' Skills',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'view',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 50,
      renderCell: params => (
        <>
          <Tooltip title="View Country " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.country}/view`,
                  query: { guId: params.row.uniqueGuid },
                }}
                legacyBehavior
              >
                <VisibilityIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Country " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.country}/AddEdit`,
                  query: { guId: params.row.uniqueGuid },
                }}
                legacyBehavior
              >
                <EditIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Country " arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                CountryDelete(params.row.id);
              }}
              size="small"
            >
              <DeleteIcon
                stroke={1.0}
                size="1.0rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>
        </>
      ),
      editable: false,
    },
  ];

  return (
    <MainCard
      title="Assessment"
      secondary={
        <Tooltip title="Add Assessment " arrow placement="right">
          <IconButton color="primary">
            <Link
              href={{
                pathname: '/assessment/addassessment',
              }}
            >
              <AddCircleOutlineRoundedIcon
                stroke={1.5}
                size="1.3rem"
                sx={{ fontSize: '2rem' }}
              />
            </Link>
          </IconButton>
        </Tooltip>
      }
    >
      <CustomDataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 20, 30, 50, 70, 100]}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={newPage => {
          setPageState(old => ({ ...old, page: newPage + 1 }));
        }}
        onPageSizeChange={newPageSize =>
          setPageState(old => ({ ...old, pageSize: newPageSize }))
        }
        columns={columns}
      />
    </MainCard>
  );
}
export default AdminAssessment;
