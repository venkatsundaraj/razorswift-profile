import MainCard from '@/cardComponents/MainCard';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillPlatformApi } from '@/swagger_api/api/SkillAliasApi';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import config from 'config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

function SkillPlatformList() {
  const dispatch = useDispatch();
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const router = useRouter();
  const { guId, skillId } = router.query;
  const { setLoading } = useContext(LoadingContext);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
  });

  const skillPlatformGet = useCallback(async () => {
    try {
      setLoading(true);
      setPageState(old => ({ ...old, isLoading: true })); // Set isLoading to true while fetching data
      const opts = {
        pageNumber: pageState.page,
        pageSize: pageState.pageSize,
      };
      let response;
      if (guId) {
        response =
          await skillPlatformApi.apiSkillPlatformGetAllPageByEntityGuidEntityGuidGet(
            guId,
            opts
          );
      } else
        response = await skillPlatformApi.apiSkillPlatformGetAllByPageGet(opts);

      if (response.body.result) {
        const mappedData = response.body.result.map(item => ({
          ...item,
          skillName: item.skill.name,
        }));

        setPageState(old => ({
          ...old,
          isLoading: false,
          data: mappedData,
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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false in the finally block to ensure it is always executed
    }
  }, [pageState.page, pageState.pageSize, skillPlatformApi, setLoading, guId]);

  const memoizedSkillPlatformGet = useCallback(
    () => skillPlatformGet(),
    [skillPlatformGet]
  );

  useEffect(() => {
    memoizedSkillPlatformGet();
  }, [memoizedSkillPlatformGet]);

  async function skillPlatformDelete(id) {
    const confirmDelete = async () => {
      try {
        const response = await skillPlatformApi.apiSkillPlatformIdDelete(id);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Skill Platform deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          memoizedSkillPlatformGet();
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
      'You want to delete this Skill Platform!',
      confirmDelete,
      revertDelete
    );
  }

  const columns = [
    {
      field: 'index',
      headerName: 'Index',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      // renderCell: params => params.index + 1,
      renderCell: index => index.api.getRowIndex(index.row.id) + 1,

      sortable: false,
      filterable: false,
    },
    {
      field: 'id',
      headerName: 'Id',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',

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
      field: 'skillName',
      headerName: ' Skill Name',
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
          <Tooltip title="View Skill Platform " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.skillalias}/view`,
                  query: guId
                    ? { guId: params.row.uniqueGuid, skillId: guId }
                    : { guId: params.row.uniqueGuid },
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

          <Tooltip title="Edit Skill Platform " arrow placement="right">
            <IconButton color="primary" size="small">
              <Link
                href={{
                  pathname: `${config.masterRoutes.skillalias}/AddEdit`,
                  query: guId
                    ? { guId: params.row.uniqueGuid, skillId: guId }
                    : { guId: params.row.uniqueGuid },
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

          <Tooltip title="Delete Skill Platform " arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                skillPlatformDelete(params.row.id);
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
      title="Skill Platform"
      secondary={
        <Tooltip title="Add Skill Platform " arrow placement="right">
          <IconButton color="primary">
            <Link
              href={{
                pathname: `${config.masterRoutes.skillalias}/AddEdit`,
                query: { skillId: guId },
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
            <CustomNoRowsOverlay title={'Skill platforms not found'} />
          ),
        }}
        getRowId={row => row.id}
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
export default SkillPlatformList;
