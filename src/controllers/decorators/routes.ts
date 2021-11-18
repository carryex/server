import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { Method } from './Methods';

const routeBinder =
  (method: string) => (path: string) => (target: any, key: string) => {
    Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    Reflect.defineMetadata(MetadataKeys.method, method, target, key);
  };

const get = routeBinder(Method.get);
const post = routeBinder(Method.post);
const put = routeBinder(Method.put);
const del = routeBinder(Method.del);
const patch = routeBinder(Method.patch);

export { get, post, put, del, patch };
