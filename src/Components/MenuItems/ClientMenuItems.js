// ** Icon imports
import { Book, BriefCase, ChartSvg } from '@/imageComponents/CustomIcons';
import GroupsIcon from '@mui/icons-material/Groups';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

// assets

// constant
const icons = { PieChartOutlineOutlinedIcon };

const ClientMenuItems = [
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
  //   title: 'Job openings',
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
];

export default ClientMenuItems;
