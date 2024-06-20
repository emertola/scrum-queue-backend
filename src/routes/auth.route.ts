import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (request: Request, response: Response) => {
    try {
      if (!request.user) {
        throw new Error('Missing user access token!');
      }
      response.send({ ...request.user });
    } catch (error) {
      response.redirect('/logout');
    }
  }
);

router.get('/me', (request: Request, response: Response) => {
  // TODO: update code here
});

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;
