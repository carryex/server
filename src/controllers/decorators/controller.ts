import 'reflect-metadata';
import express from 'express';

const router = express.Router();

const controller = (routePrefix: string) => (target: Function) => {
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata('path', target.prototype, key);

    if (path) {
      router.get(`${routePrefix}${path}`, routeHandler);
    }
  }
};

export { router, controller };
