import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader1 from '@/components/Loader1';
import { Geturl } from '@/UiControllers/controller';

export default function Page() {
  const router = useRouter();
  const { key } = router.query;

useEffect(() => {
  if (key) {
    (async () => {
      const res = await Geturl(String(key));
      if (res.success) window.location.href = res.location;
    })();
  }
}, [key]);


  return <div className='w-screen h-screen bg-white flex justify-center items-center'>

    <Loader1/>
  </div>;
}
