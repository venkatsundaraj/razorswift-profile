import ProfileCard from '@/cardComponents/ProfileCard';

const RightBar = ({ children }) => {
  return (
    <ProfileCard
      styleProps={{
        minHeight: '100Vh',
        width: '100%',
        // minWidth: '375px',
        borderRadius: '13px 13px 0px 0px',
      }}
      bgcolor="red"
    >
      {children}
    </ProfileCard>
  );
};

export default RightBar;
