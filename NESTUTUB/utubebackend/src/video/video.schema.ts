import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  username: {type:String,required:true},
  userpass:{
  type:String,
  required:true
 },userhistory:{
  type: [String],
  required: true
 },likedvideoid: {
    type: [String],
    required: true
  }, watchlatervideoid: {
    type: [String],
    required: true
  },
  videoname: {
    type: String,
    required:true
  },
  channelname: {
    type: String
    ,required:true
  },
  views: {
    type: String,
    required:true
  },
  likes:{
   type: String, required:true
  },
  channelimage: {
    type: String,
    required:true
  },
   channelsubs:{type:String},
   date:{type:String},
   videosrc: {
    type: String,
    
  },thumbnail:{type:String},subscriptions:[String]
});
