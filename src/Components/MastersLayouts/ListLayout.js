import MainCard from '@/cardComponents/MainCard';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { CustomDataGrid } from '@/src/Components/View/Datagrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';

const ListLayout = ({ children, ...props }) => {
  //starting from here
  console.log('DDd', props);
  const { title, secondaryTitle, path, columns, pageState, setPageState } =
    props;
  return (
    //start the reauable comaopnet and mentioned prop take
    <MainCard
      title={title} // props reusbale
      secondary={
        <Tooltip
          title={secondaryTitle} // props
          arrow
          placement="right"
        >
          <IconButton color="primary">
            <Link
              href={{
                pathname: path, // props
              }}
              legacyBehavior
            >
              <AddCircleOutlineRoundedIcon
                stroke={1.5}
                size="1.3rem"
                sx={{ fontSize: '2rem' }}
              />
            </Link>
          </IconButton>
        </Tooltip>
      }
    >
      <CustomDataGrid
        components={{
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay
              title={`${title}s not found`} // props
            />
          ),
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
      {children}
    </MainCard>
    //end reauable compinenet
  );
};
export default ListLayout;
