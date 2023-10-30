import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import MainCard from '@/cardComponents/MainCard';
import Title from '@/headingComponents/Title';
import { CandidateApi } from '@/swagger_api/*';
import { CustomDataGridMastersSelction } from '@/view/Datagrid';
import {
  Box,
  Link as MuiLink,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import Select from '@/formComponents/FormsUI/Select';
// import Select from '@/formComponents/FormsUI/Select';

// import Select from '@/formComponents/FormsUI/Select';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const Invoices = () => {
  const theme = useTheme();
  const gridRef = useRef();
  const colors = theme.palette;
  const [selectionModel, setSelectionModel] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const candidateApi = useMemo(() => new CandidateApi(), []);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  var selectedRows = useMemo(
    () => candidateList.filter(row => selectionModel.includes(row.id)),
    [candidateList, selectionModel]
  );
  console.log(selectedRows);
  useEffect(() => {
    setSelectedCandidate(selectedRows);
    console.log('selectedCandidate', selectedCandidate);
  }, [selectedRows]);

  const getCandidateList = useCallback(async () => {
    try {
      const response = await candidateApi.apiCandidateGet();
      if (response.body.message === 'Records Fetched Successfully.') {
        const trim = response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          id: index + 1,
          ...res,
        }));
        console.log('trim', trim);
        // setCandidateList(prevState => ({
        //   ...prevState,
        //   rows: trim,
        // }));
        setCandidateList(trim);
      } else if (response.body.message === 'No Records Found.') {
        setCandidateList([]);
      }
    } catch (err) {
      console.log(err);
      setCandidateList([]);
    }
  }, [candidateApi]);

  useEffect(() => {
    getCandidateList();
  }, [getCandidateList]);

  const handleSelectionModelChange = newSelectionModel => {
    setSelectionModel(newSelectionModel);
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: params => <>{params?.row?.firstName}</>,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'slug',
      headerName: 'Slug',
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
            href={params.row.slug ? `/aspirant/${params.row.slug}` : ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.row.slug}
          </MuiLink>
        </>
      ),
    },
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   flex: 1,
    // },
  ];

  const handleButtonClick = () => {
    const selectedData = candidateList.filter(row =>
      selectionModel.includes(row.id)
    );
    setSelectedCandidate(selectedData);
    console.log(selectedData);
    console.log(selectedData);
  };

  return (
    <Box m="20px">
      <MainCard title="Suggested Candidates">
        {/* <Box
          m='40px 0 0 0'
          height='75vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              // color: colors.primary[200],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.primary.light,
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiCheckbox-root': {
              color: `${colors.orange['dark']} !important`,
            },
            '& MuiTablePagination-selectLabel': {
              color: 'white',
            },
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: colors.primary[800],
              color: 'white',
            },
          }}>
          <DataGrid
            checkboxSelection
            rows={candidateList}
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            rowsPerPageOptions={[5, 10, 20, 40, 60, 80, 100]}
            ref={gridRef}
          />
        </Box>
        <Button onClick={handleButtonClick}>Get Selected Rows</Button> */}
        <Title>Jd Title</Title>
        <Stack spacing={2}>
          <CustomDataGridMastersSelction
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
              rows: candidateList,
            }}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            pageSizeOptions={[5, 10]}
            rowsPerPageOptions={[5, 10, 20, 40, 60, 80, 100]}
            ref={gridRef}
          />
          <Stack
            justifyContent={'flex-end'}
            sx={{ width: '100%' }}
            alignItems={'flex-end'}
          >
            {selectedCandidate?.length > 0 && (
              <ShadowButtonSubmit
                height="50px"
                width="100%"
                minwidth="250px"
                maxwidth="350px"
                backgroundcolor={theme.palette.primary.main}
                type="submit"
                onClick={() => handleButtonClick()}
              >
                <ButtonText color="#fff">Invite</ButtonText>
              </ShadowButtonSubmit>
            )}
          </Stack>
        </Stack>
      </MainCard>
    </Box>
  );
};

export default Invoices;
