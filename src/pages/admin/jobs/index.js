import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import { StyledChip } from '@/reUsableComponents/Chips';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import JdStatus from '@/reUsableComponents/Status/JdStatus';
import { AcceptedStatusTypes } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import { JobDescriptionApi } from '@/swagger_api/*';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import {
  getExperienceRange,
  getSalaryRange,
} from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import { mapAndJoinCities } from '@/utils/CommonFunctions/MapperFunctions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Grid,
  IconButton,
  Link as MuiLink,
  Tooltip,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const UrlBase = `/admin/jobs`;

const JobDescriptions = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [jdList, setJdList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({ id: 0, label: 'All' });

  const columns = [
    {
      field: 'slno',
      headerName: 'Sl no',
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.slno,
      sortable: false,
      filterable: false,
    },
    {
      field: 'client',
      headerName: 'Client',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => {
        return <>{params.row?.client?.name || '-'}</>;
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'noOfOpenings',
      headerName: 'No. of Openings',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'salaryRange',
      headerName: 'Salary Range',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => getSalaryRange(params.row),
    },
    {
      field: 'experience',
      headerName: 'Experience Range',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => getExperienceRange(params.row),
    },

    {
      field: 'jobLocation',
      headerName: 'Job Location',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'date',
      headerName: 'Creation Date',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'values',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <JdStatus
            value={params.row.isHold ? 7 : params.row.status || 'default'}
          />
        </>
      ),
    },
    {
      field: 'slug',
      headerName: 'Slug',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <MuiLink
            sx={{
              maxWidth: '500px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'none',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            style={{ textDecoration: 'none' }}
            component={NextLink}
            prefetch={false}
            href={
              params.row.slug
                ? `/jobs/${encodeURIComponent(params.row.slug)}`
                : ''
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.row.slug}
          </MuiLink>
        </>
      ),
    },
    {
      field: 'view  ',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 50,
      renderCell: params => (
        <>
          <Tooltip title="View Jobs" arrow placement="right">
            <IconButton color="primary" size="small">
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={NextLink}
                prefetch={false}
                href={{
                  pathname: `${UrlBase}/view`,
                  query: { guId: params.row.uniqueGuid },
                }}
                legacyBehavior
              >
                <VisibilityIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              </MuiLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Jobs" arrow placement="right">
            <IconButton
              disabled={
                [2, 3, 4, 5, 6].includes(params.row.status)
                //  || params.row.acceptance === AcceptanceType['Acceptance']
              }
              color="primary"
              size="small"
            >
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={NextLink}
                prefetch={false}
                href={{
                  pathname: `${UrlBase}/edit`,
                  query: { guId: params.row.uniqueGuid },
                }}
                legacyBehavior
              >
                <EditIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              </MuiLink>
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Delete Jobs" arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                deleteJobDescriptions(params.row.id);
              }}
              size="small"
            >
              <DeleteIcon
                stroke={1.0}
                size="1.0rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip> */}
        </>
      ),
      editable: false,
    },
  ];

  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);

  const fetchJd = useCallback(
    async (status, opts = {}) => {
      try {
        let response;
        if (status === 0) {
          response = await jobDescriptionApi.apiJobDescriptionGet();
        } else if (status === 7 || status === 8) {
          response =
            await jobDescriptionApi.apiJobDescriptionGetAllJdHoldStatusHoldGet(
              status === 7,
              opts
            );
        } else {
          response =
            await jobDescriptionApi.apiJobDescriptionGetAllJdByStatusStatusGet(
              status,
              opts
            );
        }

        const trim =
          response?.body?.result?.map((res, index) => ({
            slno: index + 1,
            ...res,
            title: res.title,
            jobLocation: mapAndJoinCities(res?.jobLocation),
            date: formatDate(res?.date),
          })) || [];

        setJdList(trim);
      } catch (error) {
        console.log(error);
      }
    },
    [jobDescriptionApi]
  );

  useEffect(() => {
    console.log(selectedStatus?.id);
    if (selectedStatus) {
      fetchJd(selectedStatus.id, {});
    }
  }, [selectedStatus, fetchJd]);

  const deleteJobDescriptions = async post => {
    const confirmDelete = async () => {
      try {
        const response = await jobDescriptionApi.apiJobDescriptionIdDelete(
          post
        );
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Jobs deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );

          if (selectedStatus) {
            fetchJd(selectedStatus.id, {});
          }
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
      'You want to delete this Jobs!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <AdminLayout>
      <MainCard
        title="Jobs List"
        secondary={
          <Tooltip title="Add Jobs" arrow placement="right">
            <IconButton color="primary">
              <MuiLink
                sx={{ textDecoration: 'none' }}
                component={NextLink}
                prefetch={false}
                href={{
                  pathname: `${UrlBase}/add`,
                }}
                legacyBehavior
              >
                <AddCircleOutlineRoundedIcon
                  stroke={1.5}
                  size="1.3rem"
                  sx={{ fontSize: '2rem' }}
                />
              </MuiLink>
            </IconButton>
          </Tooltip>
        }
      >
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {AcceptedStatusTypes.map(item => (
            <Grid item key={item.id}>
              <StyledChip
                key={item.id}
                label={item.label}
                isSelected={
                  selectedStatus ? selectedStatus.id === item.id : false
                }
                fullWidth
                border={theme.palette.primary.main}
                backgroundColor={'#fff'}
                onClick={() => {
                  setSelectedStatus(item);
                }}
              />
            </Grid>
          ))}
        </Grid>
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="There are no Jobs to show" />
            ),
          }}
          data={{
            columns: columns,
            initialState: {
              columns: {
                columnVisibilityModel: {
                  id: true,
                },
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              },
            },
            rows: jdList,
          }}
          loading={false}
        />
      </MainCard>
    </AdminLayout>
  );
};

export default JobDescriptions;
