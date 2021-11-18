import express from 'express';

class AppRouter {
  private static instance: express.Router;

  static get instanse(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}

export { AppRouter };
