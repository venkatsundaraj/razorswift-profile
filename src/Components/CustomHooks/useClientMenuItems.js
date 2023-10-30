import { Book, BriefCase, ChartSvg } from '@/imageComponents/CustomIcons';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SurroundSoundOutlinedIcon from '@mui/icons-material/SurroundSoundOutlined';
import { useEffect, useRef, useState } from 'react';
// ** Icon imports

const useClientMenuItems = () => {
  const shouldLog = useRef(true);
  const [clientMenuItems, setClientMenuItems] = useState([
    {
      title: 'Dashboard',
      id: '1',
      icon: <ChartSvg height={23} />,
      path: '/client/dashboard',
      selected: false,

      // subPaths: [
      //   {
      //     title: 'Aspirants',
      //     id: '1',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/',
      //   },
      //   {
      //     title: 'Business',
      //     id: '2',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/',
      //   },
      //   {
      //     title: 'Mentors',
      //     id: '3',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/',
      //   },
      //   {
      //     title: 'Service providers',
      //     id: '4',
      //     // icon: icons.PieChartOutlineOutlinedIcon,
      //     path: '/',
      //   },
      // ],
    },

    // {
    //   title: 'Jobs',
    //   id: '2',
    //   icon: <BriefCase />,
    //   path: '/client/jobopenings',
    //   selected: false,
    // },
    {
      title: 'Jobs',
      id: '3',
      icon: <BriefCase />,
      path: '/client/jobs',
      selected: false,
    },
    // {
    //   title: 'Candidates',
    //   id: '4',
    //   icon: <About />,
    //   path: '/about',
    //   selected: false,
    // },

    {
      title: 'Interviews',
      id: '5',
      icon: <Book />,
      path: '/client/interviews',
      selected: false,
    },

    // {
    //   title: 'Offers',
    //   id: '6',
    //   icon: <Book />,
    //   path: '/contact',
    //   selected: false,
    // },
    // {
    //   title: 'Company profile',
    //   id: '7',
    //   icon: <Book />,
    //   path: '/contact',
    //   selected: false,
    // },
    // {
    //   title: 'Billing & payments',
    //   id: '8',
    //   icon: <Book />,
    //   path: '/contact',
    //   selected: false,
    // },
  ]);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const clientDetails = localStorageUtil.getItem('clientDetails');
      if (clientDetails?.contact?.contactType === 1) {
        const teamsItem = clientMenuItems.find(
          item => item.title === 'Teams' && item.id === '6'
        );

        if (!teamsItem) {
          console.log('clientMenuItems', clientMenuItems);
          setClientMenuItems(prevState => [
            ...prevState,
            {
              title: 'Interview Rounds',
              id: '6',
              icon: <SurroundSoundOutlinedIcon />,
              path: '/client/interviewrounds',
              selected: false,
            },

            {
              title: 'Teams',
              id: '6',
              icon: <GroupsIcon />,
              path: '/client/teams',
              selected: false,
            },
            {
              title: 'Settings',
              id: '7',
              icon: <SettingsSuggestIcon />,
              path: '/client/settings',
              selected: false,
            },
          ]);
        }
      }
    }
  }, [clientMenuItems]);

  return clientMenuItems;
};

export default useClientMenuItems;
