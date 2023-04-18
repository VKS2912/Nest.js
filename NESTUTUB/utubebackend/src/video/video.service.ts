import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Video } from './video.interface';
import { Comment } from './comments.interface';

@Injectable()
export class VideoService {
  constructor(@InjectModel('Video') private videoModel: Model<Video>, @InjectModel('comment') private commentModel: Model<Comment>) {}
  
  async addThumbnail(videoname:string, thumbnail:string): Promise<Video> {
      return this.videoModel.findOneAndUpdate({videoname:videoname,thumbnail:thumbnail})
  }
  async create(video: Video): Promise<Video> {
    const createdVideo = new this.videoModel(video);
    return createdVideo.save();
  }
  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }
  async findById(id: ObjectId): Promise<Video> {
    return this.videoModel.findOne(id);
  }
  async getVideosContainingName(name: string): Promise<Video[]>  {
    const anme = encodeURIComponent(name)
    return this.videoModel.find({ videoname: { $regex: anme, $options: 'i' } }).exec();
  }
  async getChannelsContainingName(name: string): Promise<Video[]>  {
    const anme = encodeURIComponent(name)
    return this.videoModel.find({ channelname: { $regex: anme, $options: 'i' } }).exec();
  } 
  async getSubs(name: string): Promise<Video[]> {
     const anme = encodeURIComponent(name)
    return this.videoModel.find({ username: anme}).exec();
  }
   async updateSubscribers(videoId: ObjectId, subscribers: string[]): Promise<Video> {
    const updatedVideo = await this.videoModel.findOneAndUpdate(
      { _id: videoId },
      { subscriptions:subscribers },
      { new: true },
    );

    return updatedVideo;
  }
   async updateHistory(id: ObjectId, userhistory: string[]): Promise<Video> {
    const updatedHistory = await this.videoModel.findOneAndUpdate(
      { _id: id },
      { userhistory:userhistory },
      { new: true },
    );

    return updatedHistory;
  }
   async updateLikedVideos(id: ObjectId, userliked: string[]): Promise<Video> {
    const updatedLiked = await this.videoModel.findOneAndUpdate(
      { _id: id },
      { likedvideoid:userliked },
      { new: true },
    );

    return updatedLiked;
  }
   async updateWatchLater(id: ObjectId, userwatch: string[]): Promise<Video> {
    const updatedWatch = await this.videoModel.findOneAndUpdate(
      { _id: id },
      { watchlatervideoid:userwatch },
      { new: true },
    );

    return updatedWatch;
  }
  async loginOrNot(username:string,userpass:string): Promise<Video> {
    const login = await this.videoModel.findOne({username: username,userpass: userpass})
    return login
  }
  async signup(username:string,userpass:string): Promise<Video> {
    const signup = new this.videoModel({ username: username,userpass: userpass});
    return signup.save()
  }
}
