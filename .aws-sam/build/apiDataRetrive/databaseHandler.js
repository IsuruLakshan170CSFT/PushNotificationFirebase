'use strict';

import {getUserOne} from './userController.js';

async function  dbData   (event,context) {
  const data =await getUserOne();
  return data;

};

export  {dbData};
