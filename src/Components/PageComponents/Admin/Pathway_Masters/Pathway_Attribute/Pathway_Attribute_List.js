import MainCard from '@/cardComponents/MainCard';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import config from 'config';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const Pathway_Attribute_List = () => {
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const { loading, setLoading } = useContext(LoadingContext);
  const skillApi = useMemo(() => new SkillApi(), []);

  const skillGet = useCallback(async () => {
    try {
      setLoading(true);
      setPageState(old => ({ ...old, isLoading: false }));

      const opts = {
        pageNumber: pageState.page,
        pageSize: pageState.pageSize,
      };
      const response = await skillApi.apiSkillGetAllByPageGet(opts);

      setLoading(false);
      if (response.body.result) {
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: response.body.result,
          total: response.body.pageResult.totalCount,
        }));
      } else {
        setPageState(old => ({
          ...old,
          isLoading: false,
          data: {},
        }));
      }
    } catch (error) {
      // Handle any errors that might occur during the API call
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [pageState.page, pageState.pageSize, skillApi, setLoading]);

  const memoizedSkillGet = useCallback(() => skillGet(), [skillGet]);

  useEffect(() => {
    memoizedSkillGet();
  }, [memoizedSkillGet]);

  async function skillDelete(id) {
    const confirmDelete = async () => {
      try {
        const response = await skillApi.apiSkillIdDelete(id);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Skill deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          memoizedSkillGet();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };

    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Skill!',
      confirmDelete,
      revertDelete
    );
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
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
      field: 'type',
      headerName: ' Type',
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
          <Tooltip title="View Skill " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.skill}/view`,
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

          <Tooltip title="Edit Skill " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.skill}/AddEdit`,
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

          <Tooltip title="Delete Skill " arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                skillDelete(params.row.id);
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
      title="Skill"
      secondary={
        <Tooltip title="Add Skill " arrow placement="right">
          <IconButton color="primary">
            <Link
              href={{
                pathname: `${config.masterRoutes.skill}/AddEdit`,
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
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay title={'Skills not found'} />
          ),
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
};
export default Pathway_Attribute_List;
