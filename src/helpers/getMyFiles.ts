import { MY_IMAGES_KEY } from '../const';

export default function getMyFiles() {
  const myFiles = localStorage.getItem(MY_IMAGES_KEY) ?? '[]';
  return JSON.parse(myFiles);
}
