import MainCard from '@/cardComponents/MainCard';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import renderCellExpand from '@/view/CellExpand';
import { Link as MuiLink, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const SkillLevelValues = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Expert',
};

const CandidateAssessmentList = ({ candidateAssessmentList }) => {
  const [candidateList, setCandidateList] = useState(candidateAssessmentList);
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
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
      sortable: false,
      filterable: false,
    },
    {
      field: 'assessment_title',
      headerName: ' Title',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'sent_date_time',
      headerName: 'Date',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'skill_platform_name',
      headerName: ' Skill',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'skill_level',
      headerName: ' Level',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'tp_link',
      headerName: 'Link',
      minWidth: 60,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',

      renderCell: params => (
        <>
          {params.row.status === 'invite_sent' && (
            <MuiLink
              component={NextLink}
              prefetch={false}
              href={decodeURIComponent(params?.row?.tp_link || '')}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </MuiLink>
          )}
        </>
      ),
    },
    {
      field: 'report',
      headerName: 'Result',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 100,
      renderCell: renderCellExpand,

      editable: false,
    },
  ];

  useEffect(() => {
    setCandidateList(candidateAssessmentList);
    console.log(candidateAssessmentList, 'candidateAssessmentList');
    if (candidateList && candidateList?.length > 0) {
      const trim =
        candidateList &&
        candidateList?.map((res, index) => ({
          id: index + 1,
          slno: index + 1,
          ...res,
          sent_date_time: formatDate(res?.sent_date_time, 'datetime'),
          skill_level: SkillLevelValues[res?.skill_level],
          report:
            res?.report && Object.keys(res?.report).length > 0
              ? `${JSON.parse(res?.report).overall_percentage}%`
              : null,
        }));
      console.log('trim', trim);
      setPageState(prevState => ({
        ...prevState,
        data: trim,
      }));
    }
  }, []);

  return (
    <MainCard title="Assessment List">
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
};

export default CandidateAssessmentList;
function CustomNoRowsOverlay() {
  return (
    <Typography variant="h6" align="center" sx={{ fontSize: '15px' }} mt={18}>
      No Records Found
    </Typography>
  );
}
