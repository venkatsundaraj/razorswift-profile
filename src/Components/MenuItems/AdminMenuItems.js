// ** Icon imports
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TimelineIcon from '@mui/icons-material/Timeline';

// assets

// constant

const mainPath = '/admin';

// const AdminMenuItems = [
//   {
//     title: 'Assessment',
//     id: '2',
//     icon: <AssessmentIcon />,
//     path: `${mainPath}/assessment/`,
//     selected: false,
//     subPaths: [
//       {
//         title: 'Assessment List',
//         id: '1',
//         //icon: icons.PieChartOutlineOutlinedIcon,
//         icon: <FormatListBulletedIcon />,
//         path: '/admin/assessment/assessmentlist',
//       },
//       {
//         title: 'Assessment Request',
//         id: '2',
//         // icon: icons.PieChartOutlineOutlinedIcon,
//         icon: <PlaylistAddCheckIcon />,
//         path: '/admin/assessment/assessmentrequest',
//       },
//     ],
//   },
//   {
//     title: 'Jobs',
//     id: '4',
//     icon: <BusinessCenterIcon />,
//     path: '/admin/jobs',
//     selected: false,
//   },

//   {
//     title: 'Clients',
//     id: '6',
//     icon: <SupervisedUserCircleIcon />,
//     path: '/admin/clients',
//     selected: false,
//   },
//   {
//     title: 'Candidates search',
//     id: '7',
//     icon: <PersonSearchIcon />,
//     path: '/admin/candidatessearch',
//     selected: false,
//   },
//   {
//     title: 'Pathway',
//     id: '7',
//     icon: <TimelineIcon />,
//     path: '/admin/pathway',
//     selected: false,
//   },
//   {
//     title: 'Pathway Masters',
//     id: '8', // Incremented id
//     icon: <TimelineIcon />,
//     path: '/admin/pathway_masters',
//     selected: false,
//     subPaths: [
//       {
//         title: 'pathway_type',
//         id: '1',
//         icon: <FormatListBulletedIcon />,
//         path: '/admin/pathway_masters/pathway_type',
//         subPaths: [
//           {
//             title: 'm_pathway_attribute',
//             id: '1.1',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/pathway_type/m_pathway_attribute',
//           },
//         ],
//       },
//       {
//         title: 'm_pathway_outcome',
//         id: '2',
//         icon: <FormatListBulletedIcon />,
//         path: '/admin/pathway_masters/m_pathway_outcome',
//         subPaths: [
//           {
//             title: 'm_pathway_outcome_attribute',
//             id: '2.1',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/m_pathway_outcome/m_pathway_outcome_attribute',
//           },
//         ],
//       },
//       {
//         title: 'step',
//         id: '3',
//         icon: <FormatListBulletedIcon />,
//         path: '/admin/pathway_masters/step',
//         subPaths: [
//           {
//             title: 'step_text',
//             id: '3.1',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/step/step_text',
//           },
//           {
//             title: 'step_attribute',
//             id: '3.2',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/step/step_attribute',
//           },
//           {
//             title: 'step_outcome',
//             id: '3.3',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/step/step_outcome',
//             subPaths: [
//               {
//                 title: 'step_outcome_communication',
//                 id: '3.3.1',
//                 icon: <FormatListBulletedIcon />,
//                 path: '/admin/pathway_masters/step/step_outcome/step_outcome_communication',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: 'course',
//         id: '4',
//         icon: <FormatListBulletedIcon />,
//         path: '/admin/pathway_masters/course',
//         subPaths: [
//           {
//             title: 'content',
//             id: '4.1',
//             icon: <FormatListBulletedIcon />,
//             path: '/admin/pathway_masters/course/content',
//           },
//         ],
//       },
//     ],
//   },
// ];

const AdminMenuItems = [
  {
    title: 'Assessment',
    id: '2',
    icon: <AssessmentIcon />,
    path: `${mainPath}/assessment/`,
    selected: false,
    subPaths: [
      {
        title: 'Assessment List',
        id: '1',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/assessment/assessmentlist`,
      },
      {
        title: 'Assessment Request',
        id: '2',
        icon: <PlaylistAddCheckIcon />,
        path: `${mainPath}/assessment/assessmentrequest`,
      },
    ],
  },
  {
    title: 'Jobs',
    id: '4',
    icon: <BusinessCenterIcon />,
    path: `${mainPath}/jobs`,
    selected: false,
  },
  {
    title: 'Clients',
    id: '6',
    icon: <SupervisedUserCircleIcon />,
    path: `${mainPath}/clients`,
    selected: false,
  },
  {
    title: 'Candidates search',
    id: '7',
    icon: <PersonSearchIcon />,
    path: `${mainPath}/candidatessearch`,
    selected: false,
  },
  {
    title: 'Pathway',
    id: '8',
    icon: <TimelineIcon />,
    path: `${mainPath}/pathway`,
    selected: false,
  },
  {
    title: 'Admin Specials',
    id: '9',
    icon: <TimelineIcon />,
    path: `${mainPath}/admin_specials`,
    selected: false,
    subPaths: [
      {
        title: 'Skill',
        id: '1',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/admin_specials/skill`,
      },
    ],
  },
  {
    title: 'Pathway Masters',
    id: '10',
    icon: <TimelineIcon />,
    path: `${mainPath}/pathway_masters`,
    selected: false,
    subPaths: [
      {
        title: 'Pathway Type',
        id: '1',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/pathway_masters/pathway_type`,
      },
      {
        title: 'Pathway Outcome',
        id: '2',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/pathway_masters/m_pathway_outcome`,
      },
      {
        title: 'Step',
        id: '3',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/pathway_masters/step`,
      },
      {
        title: 'Course',
        id: '4',
        icon: <FormatListBulletedIcon />,
        path: `${mainPath}/pathway_masters/course`,
      },
    ],
  },
];

export default AdminMenuItems;
