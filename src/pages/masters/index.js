import MainCard from '@/cardComponents/MainCard';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

const columns = [
  {
    field: 'id',

    headerName: 'ID',

    minWidth: 100,

    headerClassName: 'super-app-theme--header',

    headerAlign: 'left',

    align: 'left',

    renderCell: params => params.row.id,

    sortable: false,

    filterable: false,
  },

  {
    field: 'path',

    headerName: 'Path',

    minWidth: 150,

    flex: 1,

    headerClassName: 'super-app-theme--header',

    headerAlign: 'left',

    align: 'left',

    renderCell: renderCellExpand,
  },

  {
    field: 'pathName',

    headerName: 'Path name',

    minWidth: 150,

    flex: 1,

    headerClassName: 'super-app-theme--header',

    headerAlign: 'left',

    align: 'left',

    renderCell: renderCellExpand,
  },

  {
    field: 'view',

    headerName: 'View',

    headerClassName: 'super-app-theme--header',

    sortable: false,

    filterable: false,

    flex: 1,

    minWidth: 50,

    disableColumnMenu: true,

    valueGetter: params =>
      `${params.row.path || ''} ${params.row.pathName || ''}`,

    renderCell: params => (
      <>
        <Tooltip title={`View ${params.row.path}`} arrow placement="right">
          <IconButton color="primary" size="small">
            <Link
              href={{
                pathname: `${params.row.pathName}`,
              }}
              legacyBehavior
            >
              <VisibilityIcon
                stroke={1.0}
                size="1.3rem"
                sx={{ fontSize: '1.3rem' }}
              />
            </Link>
          </IconButton>
        </Tooltip>
      </>
    ),

    editable: false,
  },
];

const rows = [
  { id: 1, pathName: '/masters/country', path: 'Country' },

  { id: 2, pathName: '/masters/state', path: 'State' },

  { id: 3, pathName: '/masters/degree', path: 'Degree' },

  { id: 4, pathName: '/masters/degreealias', path: 'Degreealias' },

  { id: 5, pathName: '/masters/skill', path: 'Skill' },

  { id: 6, pathName: '/masters/skillplaform', path: 'Skill Platform' },

  { id: 7, pathName: '/masters/hotskill', path: 'Hotskill' },

  { id: 8, pathName: 'masters/company', path: 'Company' },

  { id: 9, pathName: 'masters/companyalias', path: 'Companyalias' },

  { id: 10, pathName: 'masters/education', path: 'Educationinstitute' },

  { id: 11, pathName: 'masters/language', path: 'Language' },

  { id: 12, pathName: 'masters/parser', path: 'Parser' },

  { id: 13, pathName: 'masters/jobtitle', path: 'Jobtitle' },

  { id: 14, pathName: 'masters/jobtitlealias', path: 'Jobtitlealias' },
];

const data = {
  columns: columns,

  initialState: {
    columns: {
      columnVisibilityModel: {
        id: true,
      },
    },
  },

  rows: rows,
};

export default function Masters() {
  return (
    <MainCard title="Masters">
      <Box sx={{ width: '100%' }}>
        <CustomDataGridMasters data={data} />
      </Box>
    </MainCard>
  );
}
