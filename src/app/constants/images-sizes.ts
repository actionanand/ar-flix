import { environment as env } from "src/environments/environment";

const url = env.imgBaseUrl;

export const IMAGES_SIZES = {
  small: `${url}/w185`,
  medium: `${url}/w342`,
  large: `${url}/original`
};