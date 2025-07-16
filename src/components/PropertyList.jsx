import React from 'react';
import PROPERTIES from '../constants/properties';

const PropertyList = ({ children }) => {
  return <>{children(PROPERTIES)}</>;
};

export default PropertyList;
