
import { UrlModel } from '@/models/url.mode';

import type { NextApiRequest, NextApiResponse } from 'next';


interface urlProp{
url:string;
lenght?:number;
}
const generateUrlKEy=({url}:urlProp,lenght=8)=>{

 const urlarray=url.toLowerCase().replace(/[^a-z0-9]/g,'').replace(/^https?:\/\//, '').split('');
 let urlkey='';
for(let i=0;i<lenght;i++){
  urlkey+=String(urlarray[Math.floor(Math.random()*urlarray.length)])
}
return urlkey;
}
export default async function sendurl(req: NextApiRequest, res: NextApiResponse) {
 try {

  
    const {url}=req.body;
    if(!url){
      return res.status(400).json({error:"Please provide a valid URL"})
    }

  
 const UrlDataInModel=  await UrlModel.findOne({Original_Url:url});
 

 if(UrlDataInModel){
  console.log(UrlDataInModel);
  
  return res.status(200).send({message:'URl Found In DB',UrlDataInModel,success:true})
 }
     const urlKey=generateUrlKEy({url:url});
 const newurl=new UrlModel({
  Url_Key:urlKey,
  Original_Url:url
 })

 await newurl.save()

  return res.status(200).send({message:'New Short Url Created',urlKey,success:true});
  
 } catch (error) {
    console.error("error while saving",error);
    return res.status(500).send({message:'Error while Saving Url',success:false});
 }
}
