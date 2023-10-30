import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExploreIcon from '@mui/icons-material/Explore';
import InboxIcon from '@mui/icons-material/Inbox';
import RouteIcon from '@mui/icons-material/Route';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useEffect, useMemo, useRef, useState } from 'react';

const useLeftBarViewMenuItem = () => {
  const shouldLog = useRef(true);
  const [leftBarMenuItems, setLeftBarMenuItems] = useState([
    {
      id: 1,
      name: 'Profile',
      icon: <InboxIcon />,
      path: '/profile',
    },
    {
      id: 2,
      name: 'Assessments',
      icon: <AssessmentIcon />,
      path: '/assessment',
    },
    {
      id: 3,
      name: 'Job openings',
      icon: <AssessmentIcon />,
      path: '/jobopenings',
    },
  ]);

  const userDetails = useMemo(
    () => localStorageUtil.getItem('userDetails'),
    []
  );

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const isParagBahagath = userDetails?.candidate?.fullName
        ?.toLowerCase()
        .includes('parag');

      const hasPathwayItem = leftBarMenuItems.some(
        item => item.name === 'Pathway' && item.id === 7
      );

      if (!isParagBahagath && !hasPathwayItem) {
        setLeftBarMenuItems(prevState => [
          ...prevState,
          {
            id: 7,
            name: 'Pathway',
            icon: <RouteIcon />,
            path: '/',
          },
        ]);
      } else if (isParagBahagath && !hasPathwayItem) {
        setLeftBarMenuItems(prevState => [
          ...prevState,
          {
            id: 7,
            name: 'Pathway',
            icon: <RouteIcon />,
            path: '/pathway',
            Subpath: [
              {
                subid: 1,
                name: 'Explore',
                icon: <ExploreIcon />,
                path: '/pathway/explore',
              },
              {
                subid: 2,
                name: 'Enroll',
                icon: <SubscriptionsIcon />,
                path: '/pathway/enroll',
              },
            ],
          },
        ]);
      }
    }
  }, [leftBarMenuItems, userDetails]);

  return leftBarMenuItems;
};

export default useLeftBarViewMenuItem;
