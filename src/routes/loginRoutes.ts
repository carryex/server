import { Router, Request, Response, NextFunction } from 'express';

interface RequestWothBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
};

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password"/>
      </div>
      <button>Submit</button>
    </form>
    `);
});

router.post('/login', (req: RequestWothBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && 'pokinsokha@gmail.com' && password === '12345') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email and password').status(400);
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>`);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Logout</a>
      </div>`);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected');
});

export { router };
