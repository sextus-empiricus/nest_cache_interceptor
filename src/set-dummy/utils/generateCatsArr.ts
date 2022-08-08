import { faker } from '@faker-js/faker';

export const generateCatsArr = (amount: number): {}[] => {
   let catsArr = [];

   for(let i = 0; i < amount; i++){
      const newCat = {
         name: faker.internet.userName(),
         email: faker.internet.email(),
         color: faker.vehicle.color(),
         isPies: faker.datatype.boolean(),
         level: Math.floor(Math.random() * 5) + 1,
      };
      catsArr.push(newCat);
   }

   return catsArr;
};