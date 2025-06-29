
import mongoose, {Document,Schema,Model} from "mongoose";


export interface IUrl extends Document{
      Url_Key: string;
  Original_Url: string;
}

const urlSchema:Schema<IUrl> = new mongoose.Schema({
    Url_Key: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 6,
    },
    Original_Url: {
        type: String,
        required: true,
        trim: true,
    }

})


export const  UrlModel:Model<IUrl>=mongoose.models.UrlModel   || mongoose.model<IUrl>('UrlModel', urlSchema);