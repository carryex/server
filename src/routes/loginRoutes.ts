import { Request, Response, NextFunction } from 'express';
import { AppRouter } from '../AppRouter';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
};

const router = AppRouter.instanse;

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Logout</a>
      </div>`);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Login</a>
      </div>`);
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected');
});

export { router };
