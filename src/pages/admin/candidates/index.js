import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import AdvanceSearch from '@/pageComponents/Admin/Candidates/AdvanceSearch';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import AddCandidatePopup from '@/src/Components/Popup/AddCandidatePopup';
import { CandidateApi } from '@/swagger_api/api/CityApi';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, IconButton, Link as MuiLink, Tooltip } from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

const Candidates = () => {
  const [isAddCandidatePopupOpen, setIsAddCandidatePopupOpen] = useState(false);
  const [addCandidatePopupInfo, setAddCandidatePopupInfo] = useState({});
  const [candidatesList, setCandidatesList] = useState({
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

  const candidateApi = useMemo(() => new CandidateApi(), []);
  const candidatesGet = useCallback(async () => {
    try {
      const response = await candidateApi.apiCandidateGet();
      if (response.body.message === 'Records Fetched Successfully.') {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          ...res,
          title: res.title,
        }));
        console.log('trim', trim);
        setCandidatesList(prevState => ({
          ...prevState,
          rows: trim,
        }));
      } else if (response.body.message === 'No Records Found.') {
        setCandidatesList(prevState => ({
          ...prevState,
          rows: [],
        }));
      }
    } catch (err) {
      console.log(err);
      setCandidatesList(prevState => ({
        ...prevState,
        rows: [],
      }));
    }
  }, []);

  useEffect(() => {
    setCandidatesList({
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
          field: 'fullName',
          headerName: 'Name',
          minWidth: 10,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        {
          field: 'email',
          headerName: 'Email',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        {
          field: 'contactNumber',
          headerName: 'Contact number',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        {
          field: 'slug',
          headerName: 'Slug',
          minWidth: 100,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
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
                href={params.row.slug ? `/aspirant/${params.row.slug}` : ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                {params.row.slug}
              </MuiLink>
            </>
          ),
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

    candidatesGet();
  }, [candidatesGet]);

  return (
    <AdminLayout>
      <MainCard
        title="Candidate List"
        secondary={
          <Tooltip title="Add Candidate" arrow placement="right">
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddCandidatePopupOpen(true);
                setAddCandidatePopupInfo();
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
        <Box marginBottom={2}>
          <AdvanceSearch setCandidatesList={setCandidatesList} />
        </Box>
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="No Candidates found" />
            ),
          }}
          data={candidatesList}
          loading={false}
        />
        <AddCandidatePopup
          isDialogOpened={isAddCandidatePopupOpen}
          handleCloseDialog={() => {
            setIsAddCandidatePopupOpen(false);
            setAddCandidatePopupInfo({});
          }}
          popUpInfo={addCandidatePopupInfo}
          candidatesGet={candidatesGet}
        />
      </MainCard>
    </AdminLayout>
  );
};

export default Candidates;
