import Loader1 from '@/components/Loader1';
import React, { useEffect, useState } from 'react';

interface IsClientOnlyProps {
  children: React.ReactNode;
}

function IsClient({ children }: IsClientOnlyProps) {
  const [isClient, setIsClient] = useState(false); // Start with false

  useEffect(() => {
    // Runs only on client side
   setTimeout(() => {
     setIsClient(true);
   }, 1000);
  }, []);

  if (!isClient) {
    return (
     
        <Loader1 />
     
    );
  }

  return <>{children}</>;
}

export default IsClient;
