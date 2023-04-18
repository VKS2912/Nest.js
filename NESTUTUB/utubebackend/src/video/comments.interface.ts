import { Document } from "mongoose";

export interface Comment extends Document {
videoname:{
  type:String,required:true
 },username:{
  type:String,required:true
 },comment:{
  type:String,required:true
 }
}