import { Document } from 'mongoose';

export interface Video extends Document {
  username: string;
  userpass: string;
  userhistory: string[];
  likedvideoid: string[];
  watchlatervideoid: string[];
  videoname: string;
  channelname: string;
  views: string;
  likes: string;
  channelimage: string;
  channelsubs: string;
  date: string;
  videosrc: string;
  thumbnail: string;
  subscriptions: string[];
}
