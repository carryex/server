import { NextFunction, RequestHandler, Request, Response } from 'express';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Method } from './Methods';

const bodyValidator =
  (keys: string[]): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send('Invalid request');
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    next();
  };

const controller = (routePrefix: string) => (target: Function) => {
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
    const method: Method = Reflect.getMetadata(
      MetadataKeys.method,
      target.prototype,
      key
    );

    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

    const requiredBodyProps =
      Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

    const validator = bodyValidator(requiredBodyProps);
    if (path) {
      AppRouter.instanse[method](
        `${routePrefix}${path}`,
        ...middlewares,
        validator,
        routeHandler
      );
    }
  }
};

export { controller };
