import { Schema, model, Document } from 'mongoose';
import { Video } from './video.interface';

// export interface Video extends Document {
//   username: string;
//   userpass: string;
//   userhistory: string[];
//   likedvideoid: string[];
//   watchlatervideoid: string[];
//   videoname: string;
//   channelname: string;
//   views: string;
//   likes: string;
//   channelimage: string;
//   channelsubs: string;
//   date: string;
//   videosrc: string;
//   thumbnail: string;
//   subscriptions: string[];
// }

const videoSchema = new Schema<Video>({
  username: { type: String, required: true },
  userpass: { type: String, required: true },
  userhistory: [{ type: String }],
  likedvideoid: [{ type: String }],
  watchlatervideoid: [{ type: String }],
  videoname: { type: String, required: true },
  channelname: { type: String, required: true },
  views: { type: String, required: true },
  likes: { type: String, required: true },
  channelimage: { type: String, required: true },
  channelsubs: { type: String, required: true },
  date: { type: String, required: true },
  videosrc: { type: String, required: true },
  thumbnail: { type: String, required: true },
  subscriptions: [{ type: String }],
});

export default model<Video>('Video', videoSchema);

