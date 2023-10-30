import CareerDropDownBody from '@/components_fbl/dropDownComponents/CareerDropDownBody';
import DropDownWrapper from '@/components_fbl/dropDownComponents/DropDownWrapper';

function BusinessDropDownBody({ dropDownBodyData }) {
  return (
    <DropDownWrapper component="section">
      <CareerDropDownBody
        style={{ width: '100%', padding: '24px 0' }}
        dropDownBodyData={dropDownBodyData}
      />
    </DropDownWrapper>
  );
}

export default BusinessDropDownBody;
