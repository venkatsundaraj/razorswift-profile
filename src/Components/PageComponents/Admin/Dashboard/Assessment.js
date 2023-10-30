import MainCard from '@/cardComponents/MainCard';
import { AssessmentApi } from '@/swagger_api/*';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Grid, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { alpha, styled } from '@mui/material/styles';
import AdminLayout from '@/layouts/NavLayout/AdminLayout';
import { StyledChip } from '@/reUsableComponents/Chips';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { AssessmentTypes } from '@/src/data/Enum';
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';

function mapSkillLevels(assessmentSkills) {
  const skillLevels = assessmentSkills.map(skill => {
    switch (skill.skillLevel) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Expert';
      default:
        return '';
    }
  });
  return skillLevels.join(', ');
}
function mapSkillPlatformNames(assessmentSkills) {
  const skillPlatformNames = assessmentSkills.map(skill => {
    return skill.skillPlatform?.name || '';
  });
  return skillPlatformNames.join(', ');
}
function mapTpSection(assessmentSkills) {
  const tpSectionNames = assessmentSkills.map(skill => {
    return skill.tpSectionName || '';
  });
  return tpSectionNames.join(', ');
}

function Assessment() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState(AssessmentTypes[0]);
  const [candidateAssessmentList, setCandidateAssessmentList] = useState([]);
  const assessmentApi = useMemo(() => new AssessmentApi(), []);
  const columns = [
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
      field: 'title',
      headerName: ' Title',
      minWidth: 10,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'integrationId',
      headerName: 'Assessment Company',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'tpSection',
      headerName: 'Section',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'level',
      headerName: ' Level',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'platFormName',
      headerName: 'Skill',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
  ];

  const GetAssessmentList = useCallback(async () => {
    try {
      const response = await assessmentApi.apiAssessmentGet();
      console.log(response);
      const trim =
        response?.body?.result?.map((res, index) => ({
          slno: index + 1,
          id: index + 1,
          title: res?.title,
          note: res?.note,
          integrationId: res?.integrationId,
          level: mapSkillLevels(res?.assessmentSkills),
          tpSection: mapTpSection(res?.assessmentSkills),
          platFormName: mapSkillPlatformNames(res?.assessmentSkills),
        })) || [];

      setCandidateAssessmentList(trim);
    } catch (error) {
      console.log(error);
    }
  }, [assessmentApi]);

  useEffect(() => {
    GetAssessmentList();
  }, []);
  return (
    <AdminLayout>
      <MainCard
        title="Assessment List"
        secondary={
          <Tooltip title="Add Assessment " arrow placement="right">
            <IconButton color="primary">
              <Link
                href={{
                  pathname: '/admin/assessment/add',
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
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {AssessmentTypes.map(item => (
            <Grid item key={item.id}>
              <StyledChip
                key={item.id}
                label={item.name}
                isSelected={
                  selectedStatus ? selectedStatus.id === item.id : false
                }
                fullWidth
                border={theme.palette.primary.main}
                backgroundColor={'#fff'}
                // Assuming count is used to determine isSelected

                onClick={() => {
                  setSelectedStatus(item);
                }}
              />
            </Grid>
          ))}
        </Grid>
        <CustomDataGridMasters
          componentsProps={{
            NoRowsOverlay: () => (
              <CustomNoRowsOverlay title="There are no Assessment to display" />
            ),
          }}
          data={{
            columns: columns,
            initialState: {
              columns: {
                columnVisibilityModel: {
                  id: true,
                },
              },
            },
            rows: candidateAssessmentList,
          }}
          loading={false}
        />
      </MainCard>
    </AdminLayout>
  );
}
export default Assessment;
