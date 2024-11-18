import React from 'react'
import { useParams } from 'react-router-dom';
import ReturnPolicy from '../../components/TextScreen/ReturnPolicy'
import WarrantyPolicy from '../../components/TextScreen/WarrantyPolicy'
import Contact from '../../components/Contact/Contact'
// import "./Home.scss"
const Support = () => {
  const { type } = useParams();

  const policyContent = {
    "return-policy": <ReturnPolicy />,
    "warranty-policy": <WarrantyPolicy />,
    "refund-policy": "<RefundPolicy />",
    "shipping-policy": "<ShippingPolicy />",
  };

  return (
    <div>
      <div className="policy-container">
        {policyContent[type] || <p>Policy not found.</p>}
      </div>
    </div>
  );
};
  
export default Support;