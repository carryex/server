import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Method } from './Methods';

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

    if (path) {
      AppRouter.instanse[method](
        `${routePrefix}${path}`,
        ...middlewares,
        routeHandler
      );
    }
  }
};

export { controller };
