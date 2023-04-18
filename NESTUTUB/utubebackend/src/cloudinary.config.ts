import { v2 } from 'cloudinary';

export const CloudinaryConfig = {
  configure: () => {
    v2.config({
      cloud_name: '<your_cloud_name>',
      api_key: '<your_api_key>',
      api_secret: '<your_api_secret>',
    });
  },
};
