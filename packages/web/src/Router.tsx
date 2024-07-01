import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { isAuthenticated: false },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
};
