import MainCard from '@/cardComponents/MainCard';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { JdAndTaggedCandidateApi } from '@/swagger_api/*';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import {
  getExperienceRange,
  getSalaryRange,
} from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import { mapAndJoinCities } from '@/utils/CommonFunctions/MapperFunctions';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Link as MuiLink, Tooltip } from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

const types = {
  2: { title: 'Accepted Request', emptyRecord: 'accepted' },
  3: { title: 'Rejected Request', emptyRecord: 'rejected' },
  1: { title: 'New Request', emptyRecord: 'new' },
  4: { title: 'Cancelled Request', emptyRecord: 'cancelled' },
  5: { title: 'Deactivated Request', emptyRecord: 'deactivated' },
  6: { title: 'Completed Request', emptyRecord: 'completed' },
  7: { title: 'Failed Request', emptyRecord: 'failed' },
};

const JobRequestType = ({ type }) => {
  const [candidateList, setCandidateList] = useState([]);
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );

  const columns = useMemo(
    () => [
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
        field: 'title',
        headerName: ' Title',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'date',
        headerName: 'Date',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'salaryRange',
        headerName: 'Salary range',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => getSalaryRange(params.row),
      },
      {
        field: 'experience',
        headerName: 'Experience range',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => getExperienceRange(params.row),
      },
      {
        field: 'jobLocation',
        headerName: 'Job location',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'view',
        headerName: 'View',
        minWidth: 60,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',

        renderCell: params => (
          <>
            <Tooltip title="View Jobs" arrow placement="right">
              <IconButton color="primary" size="small">
                <MuiLink
                  sx={{ textDecoration: 'none' }}
                  component={NextLink}
                  prefetch={false}
                  href={{
                    pathname: `/jobopenings/view`,
                    query: {
                      guId: params.row.uniqueGuid,
                      id: params.row.jdCandidateId,
                    },
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
          </>
        ),
      },
      {
        field: 'remarks',
        headerName: 'Remarks',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
    ],
    []
  );
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );

  const getRequestList = useCallback(async () => {
    try {
      const response =
        await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateGetAllJdByCandidateIdCandidateIdStatusGet(
          userDetails?.candidateId,
          type
        );
      if (response.body.result) {
        const trim = response.body.result?.map((res, index) => ({
          slno: index + 1,
          ...res?.jobDescription,
          jdCandidateId: res?.id,
          jobLocation: mapAndJoinCities(res?.jobDescription?.jobLocation),
          date: formatDate(res?.jobDescription?.date),
          remarks: res.remarks, // this is to store for remarks view
        }));

        setCandidateList(trim);
      } else {
        setCandidateList([]);
      }
    } catch (err) {
      setCandidateList([]);
      console.log(err);
    }
  }, [jdAndTaggedCandidateApi, userDetails, type]);
  useEffect(() => {
    getRequestList();
  }, [getRequestList]);

  return (
    <MainCard
      title={types[type]?.title || types[1]?.title}
      sx={{ width: '100%' }}
    >
      <CustomDataGridMasters
        componentsProps={{
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay
              title={`No ${convertToSentenceCase(
                types[type]?.emptyRecord || types[1]?.emptyRecord
              )} job requests found`}
            />
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
          rows: candidateList,
          getRowId: row => row?.jdCandidateId,
        }}
        loading={false}
      />
    </MainCard>
  );
};

export default JobRequestType;
