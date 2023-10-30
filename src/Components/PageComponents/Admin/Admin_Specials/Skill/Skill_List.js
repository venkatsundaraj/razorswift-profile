import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import ListLayout from '@/src/Components/MastersLayouts/ListLayout';
import { GeneratedMasterURLs } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const skillApi = new SkillApi();

const Skill_List = () => {
  //starting from here
  const dispatch = useDispatch(); //custom hook
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  }); // pages set can we use the some custom hook
  const { setLoading } = useContext(LoadingContext);

  const skillGet = useCallback(async () => {
    setLoading(true);

    try {
      const opts = {
        pageNumber: pageState.page,
        pageSize: pageState.pageSize,
      };

      const response = await skillApi.apiSkillGetAllByPageGet(opts);

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
      console.error('Error fetching data:', error);
      setPageState(old => ({ ...old, isLoading: false, data: {} }));
    } finally {
      setLoading(false);
    }
  }, [pageState.page, pageState.pageSize, setLoading]);

  //custom hook function but skillApi.apiSkillGetAllByPageGet(opts) changed whole function should remain common hook

  const memoizedSkillGet = useCallback(() => skillGet(), [skillGet]);

  useEffect(() => {
    memoizedSkillGet();
  }, [memoizedSkillGet]); // custom hook

  // ending here cutsom hook

  //delete function can also inclue in the custom hookk only id w and function will be passed
  async function skillDelete(id) {
    const confirmDelete = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
  // sbove common await skillApi.apiSkillIdDelete(id) cahnge fuction

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
                  pathname: `${GeneratedMasterURLs.skill.view}`,
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
                  pathname: `${GeneratedMasterURLs.skill.edit}`,
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
  // from component only

  return (
    <ListLayout
      title="Skill"
      secondaryTitle="Add Skill"
      path={GeneratedMasterURLs.skill.create}
      columns={columns}
      pageState={{ ...pageState }}
      setPageState={setPageState}
    />
  );
};
export default Skill_List;
