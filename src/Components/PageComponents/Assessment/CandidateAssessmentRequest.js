import MainCard from '@/cardComponents/MainCard';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import renderCellExpand from '@/view/CellExpand';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const StatusValues = {
  0: 'Open',
  1: 'Closed',
  2: 'Rejected',
};

function mapSkillLevels(skillLevel) {
  switch (skillLevel) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Expert';
    default:
      return '';
  }
}

const CandidateAssessmentRequest = ({ candidateAssessmentRequestList }) => {
  const [candidateList, setCandidateList] = useState(
    candidateAssessmentRequestList
  );
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

  const columns2 = [
    {
      field: 'slno',
      headerName: 'Sl no',
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => params.row.id,
      sortable: false,
      filterable: false,
    },

    {
      field: 'candidate_skill_platform_name',
      headerName: 'Skill Platform',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'skill_level',
      headerName: 'Level',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'request_date_time',
      headerName: 'Date',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <>
          <Typography variant="body1">{params.row.status}</Typography>
        </>
      ),
    },
    {
      field: 'reject_reason',
      headerName: 'Remarks',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 50,
      renderCell: renderCellExpand,
      editable: false,
    },
  ];

  useEffect(() => {
    setCandidateList(candidateAssessmentRequestList);

    if (candidateList && candidateList?.length > 0) {
      const trim =
        candidateList &&
        candidateList?.map((res, index) => ({
          id: index + 1,
          ...res,
          skill_level: mapSkillLevels(res?.skill_level),
          request_date_time: formatDate(res?.request_date_time, 'datetime'),
          status: StatusValues[res?.status],
        }));
      console.log('trim', trim);
      setPageState(prevState => ({
        ...prevState,
        data: trim,
      }));
    }
  }, []);

  return (
    <MainCard title="Assessment Request">
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
        columns={columns2}
      />
    </MainCard>
  );
};

export default CandidateAssessmentRequest;
