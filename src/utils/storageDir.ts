import { join } from 'path';

export const storageDir = () => {
   return join(__dirname, '../../storage');
};
