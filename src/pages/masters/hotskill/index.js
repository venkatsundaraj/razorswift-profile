import MainCard from '@/cardComponents/MainCard';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { HotSkillApi } from '@/swagger_api/api/HotSkillApi';
import renderCellExpand from '@/view/CellExpand';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip, Typography } from '@mui/material';
import config from 'config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
function hotskill() {
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

  async function hotskillGet() {
    setPageState(old => ({ ...old, isLoading: false }));
    const k = new HotSkillApi();
    const opts = {
      pageNumber: pageState.page,
      pageSize: pageState.pageSize,
    };
    await k.apiHotSkillGetAllByPageGet(opts).then(async response => {
      if (response.body.message === 'Records Fetched Successfully.') {
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: response.body.result,
          total: response.body.pageResult.totalCount,
        }));
      } else if (response.body.message === 'No Records Found.') {
        Swal.fire({
          icon: 'info',
          title: '',
          text: 'No Records Found!',
        });
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: {},
        }));
      }
    });
  }
  useEffect(() => {
    hotskillGet();
  }, [pageState.page, pageState.pageSize]);
  async function hotskillDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Language?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'purple',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(result => {
      console.log(result, 'box');
      if (result.isConfirmed) {
        const k = new HotSkillApi();
        k.apiHotSkillIdDelete(id)
          .then(async response => {
            if (response.body.message === 'Deleted Successfully.') {
              Swal.fire({
                icon: 'success',
                title: 'Delete',
                text: 'Hot Skill Deleted Successfully.',
              });
              hotskillGet();
            } else if (response.body.message === 'Deletion Failed.') {
              Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Hot Skill Deletion Failed!',
              });
              hotskillGet();
            }
            console.log('del', response);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Rejected!', 'You have reverted the delete action', 'info');
      }
    });
  }
  const columns = [
    {
      field: 'id',
      headerName: ' Id',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.id,
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: ' Name',
      minWidth: 150,
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
          <Tooltip title="View Hot Skill" arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.hotskill}/view`,
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
          <Tooltip title="Edit Hot Skill" arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.hotskill}/AddEdit`,
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

          <Tooltip title="Delete Hot Skill" arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                hotskillDelete(params.row.id);
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
      title="Hot Skill"
      secondary={
        <Tooltip title="Add Hot Skill" arrow placement="right">
          <IconButton color="primary">
            <Link
              href={{
                pathname: `${config.masterRoutes.hotskill}/AddEdit`,
              }}
              legacyBehavior
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
export default hotskill;
