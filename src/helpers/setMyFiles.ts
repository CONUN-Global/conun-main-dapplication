import { MY_IMAGES_KEY } from '../const';

export default function setMyFiles(files: any[] = []) {
  return localStorage.setItem(MY_IMAGES_KEY, JSON.stringify(files));
}
