import { createRootRouteWithContext } from '@tanstack/react-router';

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === 'production'
//     ? () => null // Render nothing in production
//     : React.lazy(() =>
//         // Lazy load in development
//         import('@tanstack/router-devtools').then((res) => ({
//           default: res.TanStackRouterDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         })),
//       );

interface RouteContext {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RouteContext>()();
