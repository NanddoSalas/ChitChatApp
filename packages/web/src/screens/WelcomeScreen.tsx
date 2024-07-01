import { Link } from '@tanstack/react-router';

export const WelcomeScreen = () => {
  return (
    <div>
      <div>Welcome</div>

      <Link to="/auth/signin">SignIn</Link>
      <Link to="/auth/signup">SignUp</Link>
    </div>
  );
};
