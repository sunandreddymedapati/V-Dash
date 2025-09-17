import React from 'react';
import { usePropertyStore } from '@/store/propertyStore';

const PropertyList = ({ children }) => {
  const properties = usePropertyStore((s) => s.properties);
  const initialized = usePropertyStore((s) => s.initialized);
  const loading = usePropertyStore((s) => s.loading);
  const fetchProperties = usePropertyStore((s) => s.fetchProperties);

  React.useEffect(() => {
    if (!initialized && !loading) {
      fetchProperties();
    }
  }, [initialized, loading, fetchProperties]);

  const propertyNames = Array.isArray(properties)
    ? properties.map((p) => p?.name).filter(Boolean)
    : [];

  return <>{children(propertyNames)}</>;
};

export default PropertyList;
