import MainCard from '@/cardComponents/MainCard';
import { MyJdViewer } from '@/pageComponents/JobDescription/ViewJd';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import CandidateHistoryPopup from '@/src/Components/Popup/CandidateHistoryPopup';
import { responseTypes } from '@/src/data/Enum';
import {
  JdAndCandidateStatusApi,
  JdAndTaggedCandidateApi,
} from '@/swagger_api/*';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  IconButton,
  MenuItem,
  Link as MuiLink,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import NextLink from 'next/link';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

const sourceSequenceEnum = {
  'Schedule Assessment': 1,
  'Update Assessment Result': 2,
  'Schedule Interview': 3,
  'Update Interview Result': 4,
  'Offer roll out': 5,
  'Accept offer': 6,
  'Accept joining': 7,
};

const messageType = {
  1: 'No candidates found',
  2: 'No candidates found',
  3: 'No candidates found',
  4: 'No candidates found',
};

const ITEM_HEIGHT = 200;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT,
      top: 100,
    },
  },
};

const NormalSelect = ({
  value,

  handleChange,
  sx,
  options,
  textLabel,
  noTextLabel,
  backgroundColor,
  placeholder,
  inputProps,
  textLabelStyle,
  readOnly,
}) => {
  return (
    <Stack spacing={1}>
      {!noTextLabel && (
        <Typography
          sx={{
            margin: 0.2,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            ...textLabelStyle,
            color: '#434343',
          }}
        >
          {textLabel} {inputProps?.required ? '*' : ''}
        </Typography>
      )}

      <Select
        sx={{ ...sx }}
        SelectDisplayProps={{
          style: {
            backgroundColor: backgroundColor || '#ffffff',
          },
        }}
        disabled={readOnly}
        displayEmpty
        MenuProps={MenuProps}
        fullWidth
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={selected => {
          if (selected?.length === 0 || !selected) {
            return (
              <Typography
                sx={{
                  color: '#434343',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '21.6px',
                }}
              >
                {placeholder ? placeholder : 'Placeholder'}
              </Typography>
            );
          }
          let obj = options.find(o => o?.value === selected);

          return obj?.name;
        }}
        input={<OutlinedInput />}
        IconComponent={KeyboardArrowDownIcon}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <Typography>{placeholder ? placeholder : 'Select'}</Typography>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={option.id} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

const JdCandidates = () => {
  const { jdData } = useContext(MyJdViewer);
  const [candidateList, setCandidateList] = useState([]);
  const [isCandidateHistoryPopupOpen, setIsCandidateHistoryPopupOpen] =
    useState(false);
  const [candidateHistoryPopupInfo, setCandidateHistoryPopupInfo] =
    useState(null);

  const columnsStatic = useMemo(
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
        field: 'name',
        headerName: ' Name',
        minWidth: 100,
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
        headerName: 'Contact Number',
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'left',
        align: 'left',
        renderCell: params => <span>{formatContactNumber(params.value)}</span>,
      },
      // {
      //   field: 'totalExperienceInYears',
      //   headerName: 'Experience',
      //   minWidth: 100,
      //   flex: 1,
      //   headerClassName: 'super-app-theme--header',
      //   headerAlign: 'left',
      //   align: 'left',
      //   renderCell: renderCellExpand,
      // },
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
    []
  );
  const additionalColumns = useMemo(
    () => [
      // {
      //   field: 'action',
      //   headerName: 'Status',
      //   minWidth: 150,
      //   headerClassName: 'super-app-theme--header',
      //   flex: 1,
      //   renderCell: params => (
      //     <CandidateStatus value={params.row.sourcingSequenceId} />
      //   ),
      // },

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
              <IconButton
                onClick={() => {
                  setIsCandidateHistoryPopupOpen(true);

                  setCandidateHistoryPopupInfo(params.row);
                }}
                color="primary"
                size="small"
              >
                <VisibilityIcon
                  stroke={1.0}
                  size="1.3rem"
                  sx={{ fontSize: '1.3rem' }}
                />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    []
  );
  const [columns, setColumns] = useState(columnsStatic);

  const [value, setValue] = useState(1 || '');

  const handleChange = event => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );
  const jdAndCandidateStatusApi = useMemo(
    () => new JdAndCandidateStatusApi(),
    []
  );

  const getRequestList = useCallback(
    async value => {
      let opts = {
        status: value,
      };
      if (value === 'All') {
        opts = {
          status: null,
        };
      }

      try {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateGetAllCandidatesByJobDescriptionIdJobDescriptionIdGet(
            jdData?.id,
            opts
          );
        if (response.body.result) {
          console.log(
            'jdAndTaggedCandidateApi.apiJdAndTaggedCandidateGetAllCandidatesByJobDescriptionIdJobDescriptionIdGet',
            response.body.result
          );
          const trim = response.body.result?.map((res, index) => ({
            slno: index + 1,
            jdCandidateId: res?.id,
            jobDescriptionId: res?.jobDescriptionId,
            ...res?.candidate,
            // name: `${
            //   [
            //     res?.candidate?.firstName,
            //     res?.candidate?.middleName,
            //     res?.candidate?.lastName,
            //   ]
            //     .filter(Boolean)
            //     .join(' ') || '-'
            // }`,
            name: res?.candidate?.fullName,
          }));
          console.log(trim, 'trim');
          setCandidateList(trim);
        } else {
          setCandidateList([]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [jdAndTaggedCandidateApi, jdData?.id]
  );

  const getAcceptedRequest = useCallback(
    async value => {
      try {
        const response =
          await jdAndCandidateStatusApi.apiJdAndCandidateStatusGetAllCandidateStatusByJdIdJobDescriptionIdGet(
            value
          );
        if (response.body.result) {
          const trim =
            response.body.result?.map((res, index) => ({
              slno: index + 1,
              jdCandidateId: res?.candidateId,
              ...res,
              name: res?.candidate?.fullName,
              email: res?.candidate?.email,
              contactNumber: res?.candidate?.contactNumber,
              slug: res?.candidate?.slug,
            })) || [];
          console.log(response.body.result);
          console.log(trim);

          setCandidateList(trim);
        } else {
          setCandidateList([]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [jdAndCandidateStatusApi]
  );

  useEffect(() => {
    if (value === 2) {
      // getAcceptedRequest(jdData?.id);
      getRequestList(value);
      setColumns([...columnsStatic, ...additionalColumns]);
    } else {
      getRequestList(value);
      setColumns([...columnsStatic]);
    }
  }, [
    getRequestList,
    value,
    // getAcceptedRequest,
    jdData,
    columnsStatic,
    additionalColumns,
  ]);

  return (
    <MainCard title="Tagged Candidates">
      <Stack alignItems="flex-end" justifyContent={'flex-end'} mb={2}>
        <NormalSelect
          sx={{ maxWidth: 200, minWidth: 150 }}
          name="mySelect"
          value={value}
          setValue={setValue}
          handleChange={handleChange}
          options={responseTypes}
          label="My Select Label"
        />
      </Stack>

      <CustomDataGridMasters
        componentsProps={{
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay title={messageType[value]} />
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
        }}
        loading={false}
      />
      <CandidateHistoryPopup
        isDialogOpened={isCandidateHistoryPopupOpen}
        popUpInfo={candidateHistoryPopupInfo}
        handleCloseDialog={() => {
          setIsCandidateHistoryPopupOpen(false);
          setCandidateHistoryPopupInfo(null);
        }}
        setPopupInfo={setCandidateHistoryPopupInfo}
      />
    </MainCard>
  );
};

export default JdCandidates;

const CandidateStatus = ({ value, text }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: {
        textColor: '#FF9800',
        backgroundColor: '#FFF3E0',
        text: text || 'Schedule Assessment',
      },
      2: {
        textColor: '#9C27B0',
        backgroundColor: '#F3E5F5',
        text: text || 'Update Assessment Result',
      },
      3: {
        textColor: '#00BCD4',
        backgroundColor: 'rgba(0, 188, 212, 0.2)',
        text: text || 'Schedule Interview',
      },
      4: {
        textColor: '#E91E63',
        backgroundColor: '#F8BBD0',
        text: text || 'Update Interview Result',
      },
      5: {
        textColor: '#4CAF50',
        backgroundColor: '#E8F5E9',
        text: text || 'Offer roll out',
      },
      6: {
        textColor: '#3F51B5',
        backgroundColor: '#E8EAF6',
        text: text || 'Accept offer',
      },
      7: {
        textColor: '#FF5722',
        backgroundColor: '#FFCCBC',
        text: text || 'Accept joining',
      },
    };

    return dataProps
      ? dataProps[value]
      : { textColor: '#1D1550', backgroundColor: '#E1DCFF', text: 'Ready' };
  }, [value, text]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties?.textColor,
        minWidth: 100,
        backgroundColor: properties?.backgroundColor,
        border: `1px solid ${properties?.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {text || properties?.text}
    </Typography>
  );
};
