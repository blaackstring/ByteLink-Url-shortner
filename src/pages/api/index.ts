import DbConnection from "@/config/Db";

import Geturl from "./redirect";
import sendurl from "./Sendurl";
import { NextApiRequest, NextApiResponse } from "next";





export default async function handler(req:NextApiRequest,res:NextApiResponse){
   await DbConnection();
   try {
    if (req.method === 'POST') return sendurl(req, res);
    

    if (req.method === 'GET') return Geturl(req, res);

     else {
      return res.status(405).json({ message: 'Method Not Allowed', success: false });
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }

}