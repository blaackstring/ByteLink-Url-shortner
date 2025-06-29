import DbConnection from '@/config/Db';
import { UrlModel } from '@/models/url.mode';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function Geturl(req: NextApiRequest, res: NextApiResponse) {


  try {

      const { urlkey } = req.query;

      const urlDoc = await UrlModel.findOne({ Url_Key: urlkey });

      if (!urlDoc) {
       
      }

      // Redirect to the original URL
        res.status(200).json({ message: 'URL  found', success:true,location:urlDoc?.Original_Url  });
     
      res.end();
    
  } catch (error) {
    console.error('Error while fetching URL:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
}
