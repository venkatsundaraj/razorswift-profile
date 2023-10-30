import MainCard from '@/cardComponents/MainCard';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { setAlertPopup } from '@/store/alertSlice';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { convertSnakeCaseToSentenceCase } from '@/utils/CommonFunctions/Functions';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

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
const SkillLevelValues = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Expert',
};

const toggleSolutionsButtonArray = [
  { id: 1, value: 'Assessment List', type: 'AL' },
  { id: 2, value: 'Request List', type: 'RL' },
  { id: 3, value: 'Jobs Assessment List', type: 'JdAL' },
];

const CandidateAssessmentAllList = ({ type }) => {
  const dispatch = useDispatch();
  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );
  const [assessmentList, setAssessmentList] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const columnsCandidateAssessmentList = useMemo(() => {
    const commonColumns = [
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
        minWidth: 160,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
      },
      {
        field: 'sent_date_time',
        headerName: 'Date',
        minWidth: 130,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: renderCellExpand,
        // renderCell: params => {
        //   // params.row.sent_date_time;
        //   formatLambdaDate(params.row.sent_date_time, 'datetime');
        // },
      },

      {
        field: 'status',
        headerName: 'Status',
        minWidth: 120,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        // renderCell: renderCellExpand,
        renderCell: params => {
          return <>{convertSnakeCaseToSentenceCase(params.row.status)}</>;
        },
      },
      {
        field: 'tp_link',
        headerName: 'Link',
        minWidth: 70,
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
    ];

    const jdALColumns = [];
    const selfColumns = [];

    if (type !== 'JdAL') {
      jdALColumns.push({
        field: 'report',
        headerName: 'Result',
        headerClassName: 'super-app-theme--header',
        sortable: false,
        filterable: false,
        flex: 1,
        minWidth: 70,
        renderCell: renderCellExpand,
        editable: false,
      });
    }
    if (type === 'AL') {
      selfColumns.push(
        {
          field: 'skill_platform_name',
          headerName: 'Skill',
          minWidth: 80,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        {
          field: 'skill_level',
          headerName: 'Level',
          minWidth: 70,
          flex: 1,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'left',
          align: 'left',
          renderCell: renderCellExpand,
        },
        {
          field: 'report',
          headerName: 'Result',
          headerClassName: 'super-app-theme--header',
          sortable: false,
          filterable: false,
          flex: 1,
          minWidth: 70,
          renderCell: renderCellExpand,
          editable: false,
        }
      );
    }

    const columns =
      type === 'AL'
        ? [...commonColumns, ...selfColumns]
        : [...commonColumns, ...jdALColumns];
    return columns;
  }, [type]);

  const columnsCandidateAssessmentRequestList = useMemo(
    () => [
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
        minWidth: 30,
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
        minWidth: 130,
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
    ],
    []
  );

  const types = useMemo(
    () => ({
      AL: {
        title: 'Assessment List',
        emptyRecord: 'Assessment list',
        columns: columnsCandidateAssessmentList,
      },
      RL: {
        title: 'Requested Assessment List',
        emptyRecord: 'rejected',
        columns: columnsCandidateAssessmentRequestList,
      },
      JdAL: {
        title: 'Jobs Assessment List',
        emptyRecord: 'New Request',
        columns: columnsCandidateAssessmentList,
      },
    }),
    [columnsCandidateAssessmentList, columnsCandidateAssessmentRequestList]
  );
  const getAssessmentList = () => {
    CandidateAssessmentListApi();
    CandidateAssessmentRequestListApi();
  };

  const CandidateAssessmentListApi = useCallback(() => {
    setAssessmentList([]);
    setLoading(true);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: { cid: userDetails?.candidateId, isSelfAssessment: type === 'AL' },
    };

    callApi('ListCandidateAssessment', data)
      .then(response => {
        setLoading(false);
        console.log(response?.data?.data, 'ListCandidateAssessment');
        if (response?.data?.status === 200) {
          const trim =
            response.data.data &&
            response.data.data?.map(
              (res, index) =>
                ({
                  id: index + 1,
                  slno: index + 1,
                  ...res,
                  sent_date_time: formatDate(res?.sent_date_time, 'datetime'),
                  skill_level: SkillLevelValues[res?.skill_level],
                  report:
                    res?.report && Object.keys(res?.report).length > 0
                      ? `${JSON.parse(res?.report).overall_percentage}%`
                      : null,
                } || [])
            );
          setAssessmentList(trim);
        } else {
          setLoading(false);
          dispatch(
            setAlertPopup({
              message: 'Something went wrong. Please try again!',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong. Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      });
  }, [dispatch, userDetails?.candidateId, setLoading, type]);

  const CandidateAssessmentRequestListApi = useCallback(() => {
    setAssessmentList([]);
    setLoading(true);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: { cid: [userDetails?.candidateId] },
    };

    callApi('ListCandidateRequest', data)
      .then(response => {
        setLoading(false);
        console.log(response, 'ListCandidateRequest');
        if (response?.data?.status === 200) {
          console.log(response.data.data);
          const res = response.data.data;
          const trim =
            res &&
            res?.map((res, index) => ({
              id: index + 1,
              ...res,
              skill_level: mapSkillLevels(res?.skill_level),
              request_date_time: formatDate(res?.request_date_time, 'datetime'),
              status: StatusValues[res?.status],
            }));
          console.log('trim', trim);
          setAssessmentList(trim);
        } else {
          setLoading(false);
          dispatch(
            setAlertPopup({
              message: 'Something went wrong. Please try again!',
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong. Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      });
  }, [dispatch, userDetails?.candidateId, setLoading]);

  const fetchData = useCallback(
    async type => {
      try {
        if (type === 'AL' || type === 'JdAL') {
          CandidateAssessmentListApi();
        } else if (type === 'RL') {
          CandidateAssessmentRequestListApi();
        }
      } catch (error) {
        console.log(error);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong. Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      }
    },
    [CandidateAssessmentListApi, CandidateAssessmentRequestListApi, dispatch]
  );

  useEffect(() => {
    fetchData(type);
  }, [type, fetchData]);

  return (
    <MainCard title={types[type]?.title || types['AL']?.title}>
      <CustomDataGridMasters
        componentsProps={{
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay
              title={`${types[type]?.title || types['AL']?.title} not found`}
            />
          ),
        }}
        data={{
          columns: types[type]?.columns,
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
          rows: assessmentList,
        }}
        loading={false}
      />
    </MainCard>
  );
};

export default CandidateAssessmentAllList;
