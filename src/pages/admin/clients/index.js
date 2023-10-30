import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import ActiveStatusComponent from '@/reUsableComponents/Status/ActiveStatus';
import ClientDetailsPopup from '@/src/Components/Popup/ClientDetailsPopup';
import { setAlertPopup } from '@/store/alertSlice';
import { ClientApi } from '@/swagger_api/api/ClientApi';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  IconButton,
  Link as MuiLink,
  Tooltip,
  Typography,
} from '@mui/material';
import { GridOverlay } from '@mui/x-data-grid';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
const UrlBase = `/admin/clients`;

const Clients = () => {
  const dispatch = useDispatch();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [ContactPopupInfo, setContactPopupInfo] = useState({});
  const [clientList, setClientList] = useState({
    columns: [],
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: true,
        },
      },
    },
    rows: [],
  });

  const clientApi = useMemo(() => new ClientApi(), []);
  const clientGet = useCallback(async () => {
    try {
      const response = await clientApi.apiClientGet();
      if (response.body.message === 'Records Fetched Successfully.') {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
          title: res.title,
          date: formatDate(res?.date),
        }));
        console.log('trim', trim);
        setClientList(prevState => ({
          ...prevState,
          rows: trim,
        }));
      } else if (response.body.message === 'No Records Found.') {
        setClientList(prevState => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (err) {
      console.log(err);
      setClientList(prevState => ({
        ...prevState,
        rows: [],
      }));
    }
  }, [clientApi]);
  useEffect(() => {
    setClientList({
      columns: [
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
          field: 'name',
          headerName: 'Name',
          minWidth: 10,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },

        {
          field: 'gstNumber',
          headerName: 'Gst Number',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },

        {
          field: 'companySize',
          headerName: 'Company Size',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },

        {
          field: 'dateOfOnBoarding',
          headerName: 'Date of Onboarding',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: params => formatDate(params.row.dateOfOnBoarding),
        },
        {
          field: 'typeOfService',
          headerName: 'Type of Service',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        // {
        //   field: 'brief',
        //   headerName: 'Brief',
        //   minWidth: 100,
        //   flex: 1,
        //   headerClassName: 'super-app-theme--header',
        //   headerAlign: 'left',
        //   align: 'left',
        //   renderCell: renderCellExpand,
        // },
        {
          field: 'values',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          flex: 1,
          renderCell: params => (
            <>
              <ActiveStatusComponent value={params.row.status} />
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
              <Tooltip title="View Client" arrow placement="right">
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
              <Tooltip title="Edit Client" arrow placement="right">
                <IconButton color="primary" size="small">
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

              {/* <Tooltip title="Delete Client" arrow placement="right">
                <IconButton
                  color="primary"
                  onClick={() => {
                    deleteClients(params.row.id);
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
              <Tooltip title="Edit Status" arrow placement="right">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    setIsContactPopupOpen(true);

                    setContactPopupInfo(params.row);
                  }}
                >
                  <EditAttributesIcon
                    stroke={1.0}
                    size="1.3rem"
                    sx={{ fontSize: '1.3rem' }}
                  />
                </IconButton>
              </Tooltip>
            </>
          ),
          editable: false,
        },
      ],

      initialState: {
        columns: {
          columnVisibilityModel: {
            id: true,
          },
        },
      },
      rows: [],
    });

    clientGet();
  }, [clientGet]);

  const deleteClients = async id => {
    const confirmDelete = async () => {
      try {
        const response = await clientApi.apiClientIdDelete(id);
        if (response.body.message === 'Deleted Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Client deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          clientGet();
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
      'You want to delete this Client!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <AdminLayout>
      <MainCard
        title="Client List"
        secondary={
          <Tooltip title="Add Client" arrow placement="right">
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
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="No Clients found" />
            ),
          }}
          data={clientList}
          loading={false}
        />
        <ClientDetailsPopup
          isDialogOpened={isContactPopupOpen}
          handleCloseDialog={() => {
            setIsContactPopupOpen(false);
            setContactPopupInfo({});
          }}
          popUpInfo={ContactPopupInfo}
          clientGet={clientGet}
          editContactInfo={ContactPopupInfo}
        />
      </MainCard>
    </AdminLayout>
  );
};

export default Clients;

function CustomNoRowsOverlay({ title }) {
  return (
    <GridOverlay>
      <Typography variant="h6" align="center" sx={{ fontSize: '15px' }} mt={18}>
        {title}
      </Typography>
    </GridOverlay>
  );
}
