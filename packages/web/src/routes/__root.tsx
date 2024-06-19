/* eslint-disable react-hooks/rules-of-hooks */
import { createRootRoute } from '@tanstack/react-router';
import { IndexScreen } from '../screens/IndexScreen';

export const Route = createRootRoute({
  component: IndexScreen,
});
