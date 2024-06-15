import { Link } from '@tanstack/react-router';

export const SignUpScreen = () => {
  return (
    <div>
      <div>SignUp</div>

      <Link to="/">Home</Link>
      <Link to="/signin">SignIn</Link>
    </div>
  );
};
