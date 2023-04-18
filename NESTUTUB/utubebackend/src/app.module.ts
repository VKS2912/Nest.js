import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule }from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cloudinary } from 'cloudinary-core';
import { v2 } from 'cloudinary';
import { CloudinaryConfig } from './cloudinary.config';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://vkshastri6929:uillPOpGmu9RRmFX@cluster69.dntavsr.mongodb.net/?retryWrites=true&w=majority'),
    VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
   constructor() {
    CloudinaryConfig.configure;
  }
}
