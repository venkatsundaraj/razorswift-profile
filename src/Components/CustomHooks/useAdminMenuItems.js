import { useEffect, useRef, useState } from 'react';
// ** Icon imports
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
// ** Icon imports

const useAdminMenuItems = () => {
  const shouldLog = useRef(true);
  const [MenuItems, setMenuItems] = useState([
    {
      title: 'Assessment',
      id: '2',
      icon: <AssessmentIcon />,
      path: '/admin/assessment/',
      selected: false,
      subPaths: [
        {
          title: 'Assessment List',
          id: '1',
          //icon: icons.PieChartOutlineOutlinedIcon,
          icon: <FormatListBulletedIcon />,
          path: '/admin/assessment/assessmentlist',
        },
        {
          title: 'Assessment Request',
          id: '2',
          // icon: icons.PieChartOutlineOutlinedIcon,
          icon: <PlaylistAddCheckIcon />,
          path: '/admin/assessment/assessmentrequest',
        },
      ],
    },
    {
      title: 'Jobs',
      id: '4',
      icon: <BusinessCenterIcon />,
      path: '/admin/jobs',
      selected: false,
      // subPaths: [
      //   {
      //     title: 'Hold',
      //     id: '1',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/admin/jobs/',
      //   },
      //   {
      //     title: 'InProgress',
      //     id: '2',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/admin/jobs/',
      //   },
      //   {
      //     title: 'New',
      //     id: '3',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/admin/jobs/view',
      //   },
      //   {
      //     title: 'Closed',
      //     id: '4',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/admin/jobs/',
      //   },
      // ],
    },
    // {
    //   title: 'Candidates',
    //   id: '5',
    //   icon: <PersonSearchIcon />,
    //   path: '/admin/candidates',
    //   selected: false,
    // },

    {
      title: 'Clients',
      id: '6',
      icon: <SupervisedUserCircleIcon />,
      path: '/admin/clients',
      selected: false,
    },
    {
      title: 'Candidates search',
      id: '7',
      icon: <PersonSearchIcon />,
      path: '/admin/candidatessearch',
      selected: false,
    },
    {
      title: 'Pathway',
      id: '7',
      icon: <TimelineIcon />,
      path: '/admin/pathway',
      selected: false,
    },
  ]);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
    }
  }, [MenuItems]);

  return MenuItems;
};

export default useAdminMenuItems;
