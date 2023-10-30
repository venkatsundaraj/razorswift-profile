// ** Icon imports
import {
  About,
  Book,
  BriefCase,
  ChartSvg,
} from '@/imageComponents/CustomIcons';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

const navigation = [
  {
    title: 'Solutions',
    id: '1',
    icon: <ChartSvg height={23} />,
    path: '/aspirants',
    selected: false,
    subPaths: [
      {
        title: 'Aspirants',
        id: '1',
        icon: PieChartOutlineOutlinedIcon,
        path: '/aspirants',
      },
      {
        title: 'Business',
        id: '2',
        icon: PieChartOutlineOutlinedIcon,
        path: '/',
      },
      {
        title: 'Mentors',
        id: '3',
        icon: PieChartOutlineOutlinedIcon,
        path: '/',
      },
      {
        title: 'Service providers',
        id: '4',
        icon: PieChartOutlineOutlinedIcon,
        path: '/',
      },
    ],
  },
  {
    title: 'Courses',
    id: '2',
    icon: <BriefCase />,
    path: '/',
    selected: false,
  },
  {
    title: 'About',
    id: '3',
    icon: <About />,
    path: '/about',
    selected: false,
  },

  {
    title: 'Contact',
    id: '4',
    icon: <Book />,
    path: '/contact',
    selected: false,
  },
];

export default navigation;
