import MainCard from '@/cardComponents/MainCard';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import ClientContactPopup from '@/src/Components/Popup/ClientContactPopup';
import ClientContactViewPopup from '@/src/Components/Popup/ClientContactViewPopup';
import ClientResetPasswordPopup from '@/src/Components/Popup/ClientResetPasswordPopup';
import { setAlertPopup } from '@/store/alertSlice';
import { ContactApi } from '@/swagger_api/api/CityApi';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const Teams = () => {
  const dispatch = useDispatch();

  const [contactList, setContactList] = useState([]);
  const [isContactViewPopupOpen, setIsContactViewPopupOpen] = useState(false);
  const [contactViewPopupInfo, setContactViewPopupInfo] = useState({});
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [ContactPopupInfo, setContactPopupInfo] = useState({});
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
  const [resetPopupInfo, setResetPopupInfo] = useState({});
  const clientDetails = localStorageUtil.getItem('clientDetails');
  const clientId = clientDetails?.contact?.clientId;

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
      field: 'name',
      headerName: 'Name',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params =>
        [params.row?.firstName, params.row?.middleName, params.row?.lastName]
          .filter(Boolean)
          .join(' '),
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',

      // renderCell: renderCellExpand,
      renderCell: params => <span>{formatContactNumber(params.value)}</span>,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },

    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <Tooltip title="View Contact" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setIsContactViewPopupOpen(true);
                setContactViewPopupInfo(params.row);
                console.log(params.row, 'row');
              }}
            >
              <VisibilityIcon
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Contact" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setIsContactPopupOpen(true);
                const contactNumber = params.row.contactNumber.substring(
                  params.row.contactNumber.length - 10
                );

                // Updated contactValue object with last ten digits
                const updatedContactValue = {
                  ...params.row,
                  contactNumber,
                };
                setContactPopupInfo(updatedContactValue);
              }}
            >
              <EditIcon
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </IconButton>
          </Tooltip>
          {contactList?.length > 1 && (
            <Tooltip title="Delete Contact" arrow placement="right">
              <IconButton
                color="primary"
                onClick={() => {
                  deleteContacts(params.row.id);
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
          )}

          {/* <Tooltip title='Reset Password' arrow placement='right'>
            <IconButton
              color='primary'
              onClick={() => {
                setIsResetPopupOpen(true);
                setResetPopupInfo(params.row);
              }}
              size='small'>
              <LockResetIcon stroke={1.0} size='1.0rem' sx={{ fontSize: '1.3rem' }} />
            </IconButton>
          </Tooltip> */}
        </>
      ),
    },
  ];

  const contactApi = useMemo(() => new ContactApi(), []);

  const ClientContactGet = useCallback(async () => {
    try {
      const response = await contactApi.apiContactGetByClientIdclientidGet(
        clientId
      );
      if (response.body.message === 'Records Fetched Successfully.') {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
        }));

        setContactList(trim);
      } else if (response.body.message === 'No Records Found.') {
        setContactList(prevState => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (err) {
      console.log(err);
      setContactList(prevState => ({
        ...prevState,
        rows: [],
      }));
    }
  }, [clientId, contactApi]);

  const deleteContacts = async id => {
    const confirmDelete = async () => {
      try {
        const response = await contactApi.apiContactIdDelete(id);
        if (response.body.message === 'Deleted Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Contact deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          ClientContactGet();
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
      'You want to delete this Contact!',
      confirmDelete,
      revertDelete
    );
  };
  useEffect(() => {
    ClientContactGet();
  }, [ClientContactGet]);

  return (
    <ClientLayout>
      <MainCard
        title="Team List"
        secondary={
          <Tooltip title="Add Contact " arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                setIsContactPopupOpen(true);
                setContactPopupInfo();
              }}
            >
              <AddCircleOutlineRoundedIcon
                stroke={1.5}
                size="1.3rem"
                sx={{ fontSize: '2rem' }}
              />
            </IconButton>
          </Tooltip>
        }
      >
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="There are no Contacts to show" />
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
            rows: contactList,
          }}
          loading={false}
        />
        <ClientContactViewPopup
          isDialogOpened={isContactViewPopupOpen}
          handleCloseDialog={() => {
            setIsContactViewPopupOpen(false);
            setContactViewPopupInfo({});
          }}
          popUpInfo={contactViewPopupInfo}
        />
        <ClientContactPopup
          isDialogOpened={isContactPopupOpen}
          handleCloseDialog={() => {
            setIsContactPopupOpen(false);
            setContactPopupInfo({});
          }}
          popUpInfo={ContactPopupInfo}
          ClientContactGet={ClientContactGet}
          editContactInfo={ContactPopupInfo}
        />
        <ClientResetPasswordPopup
          isDialogOpened={isResetPopupOpen}
          handleCloseDialog={() => {
            setIsResetPopupOpen(false);
            setResetPopupInfo({});
          }}
          popUpInfo={resetPopupInfo}
        />
      </MainCard>
    </ClientLayout>
  );
};

export default withAuth(Teams, 'client');
