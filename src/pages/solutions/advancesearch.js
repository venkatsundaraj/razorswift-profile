import MainCard from '@/cardComponents/MainCard';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import {
  CandidateApi,
  JdAndTaggedCandidateApi,
} from '@/swagger_api/api/CityApi';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import AdvancedCandidateSearchForm from '@/reUsableComponents/CandidateSearch/AdvancedCandidateSearchForm';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import AddCandidatePopup from '@/src/Components/Popup/AddCandidatePopup';

const AdvanceSearch = () => {
  const dispatch = useDispatch();
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );

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
  const [newCandidateList, setNewCandidateList] = useState([]);
  const candidateApi = useMemo(() => new CandidateApi(), []);
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
          <AdvancedCandidateSearchForm
            setCandidatesList={setNewCandidateList}
            backend={true}
            jdId={'123'}
          />
        </Box>
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="No Candidates are found" />
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
        />
      </MainCard>
    </AdminLayout>
  );
};

export default AdvanceSearch;
