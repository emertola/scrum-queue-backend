import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (request: Request, response: Response) => {
    console.log('request', request.user);
    // console.log('response', response);
    response.status(200).send('Login Success');
  }
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;
