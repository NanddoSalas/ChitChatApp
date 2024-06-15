import { Link } from '@tanstack/react-router';

export const WelcomeScreen = () => {
  return (
    <div>
      <div>Welcome</div>

      <Link to="/signin">SignIn</Link>
      <Link to="/signup">SignUp</Link>
    </div>
  );
};
