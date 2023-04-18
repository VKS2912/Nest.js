import { Controller,Post,Patch, Get,Query, Param, Body,UseInterceptors, UploadedFile } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express'
import VideoModel from './video.model';
import { Multer } from 'multer';
import { VideoService } from './video.service';
import { Video } from './video.interface';
import { CommentsModel } from './comments.schema';
import { Comment } from './comments.schema';
import { ObjectId } from 'mongoose';
import { v2 } from 'cloudinary';
import { VideoSearchDto } from './video-search.dto';
import { ChannelSearchDto } from './channel-search.dto';
import { SubsDto } from './subs.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }
   @Get(':id')
  async findById(@Param('id') id: ObjectId) {
    const video = await this.videoService.findById(id);
    
    return { ...video,  };
  }
  @Post('in')
  @UseInterceptors(FileInterceptor('video'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() videoData: Video) {
    const { secure_url } = await v2.uploader.upload(file.path);
    const video = new VideoModel({
     ...videoData,videosrc: secure_url
  })
    
    return this.videoService.create(video);
  }
   @Post('thumbnail')
  @UseInterceptors(FileInterceptor('video'))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File,@Body() videoname:string) {
    const { secure_url } = await v2.uploader.upload(file.path);
    const 
     thumbnail = secure_url
    return this.videoService.addThumbnail(videoname,thumbnail);
  }
   @Get('getVideosByInput')
  getVideosContainingName(@Body() videoSearchDto: VideoSearchDto) {
    return this.videoService.getVideosContainingName(videoSearchDto.videoname);
  }
  @Get('getChannelByInput')
  getChannelsContainingName(@Body() channelSearchDto: ChannelSearchDto){
   return this.videoService.getChannelsContainingName(channelSearchDto.channelname);}
   @Post('videoData')
   async uploadVideos(@Body() videoData: Video){
    const video = new VideoModel ({...videoData})
    return this.videoService.create(video)
   }
   @Get('getSubscriptionsOfUsername')
   getSubs(@Query('username') subsDto: string ){
    return this.videoService.getSubs(subsDto)
   }
    
    @Patch(':id/subscribers')
  async updateSubscribers(
    @Param('id') id: ObjectId,
    @Body('subscribers') subscriptions: string[],
  ) {
    const updatedVideo = await this.videoService.updateSubscribers(
      id,
      subscriptions,
    );
    return updatedVideo;
  }
  @Patch(':id/history')
  async updateHistory(
    @Param('id') id: ObjectId,
    @Body('history') userhistory: string[],
  ) {
    const updatedHistory = await this.videoService.updateHistory(
      id,
      userhistory,
    );
    return updatedHistory;
  }
  @Patch(':id/liked')
  async updateLikedVideos(
    @Param('id') id: ObjectId,
    @Body('liked') userliked: string[],
  ) {
    const updatedLiked = await this.videoService.updateLikedVideos(
      id,
      userliked,
    );
    return updatedLiked;
  }
  @Patch(':id/watchlater')
  async updateWatchLater(
    @Param('id') id: ObjectId,
    @Body('watchlater') userwatch: string[],
  ) {
    const updatedWatch = await this.videoService.updateWatchLater(
      id,
      userwatch,
    );
    return updatedWatch;
  }
  @Get('login')
  async login(@Body() username: string, userpass:string)
  {
    const loginOrNot = await this.videoService.loginOrNot(username,userpass)
    return loginOrNot;
  } 
  @Post('signup')
  async signup(@Body() username: string, userpass:string){
    const signup = await this.videoService.signup(username,userpass)
  }
}
@Controller('comments')
export class CommentController {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  @Get(':videoname')
  async getCommentsByVideoname(@Param('videoname') videoname: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ videoname }).exec();
    return comments;
  }
   @Post()
  async createComment(@Body() comment: Comment): Promise<Comment> {
    const createdComment = new this.commentModel(comment);
    return createdComment.save();
  }
}

