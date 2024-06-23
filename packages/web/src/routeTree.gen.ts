/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsersImport } from './routes/users'
import { Route as SignupImport } from './routes/signup'
import { Route as SigninImport } from './routes/signin'
import { Route as RoomsImport } from './routes/rooms'
import { Route as InvitationsImport } from './routes/invitations'
import { Route as AccountImport } from './routes/account'
import { Route as IndexImport } from './routes/index'
import { Route as UserUserIdUserNameImport } from './routes/user/$userId.$userName'
import { Route as RoomRoomIdRoomNameImport } from './routes/room/$roomId.$roomName'
import { Route as RoomRoomIdRoomNameMembersImport } from './routes/room/$roomId.$roomName.members'

// Create/Update Routes

const UsersRoute = UsersImport.update({
  path: '/users',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const RoomsRoute = RoomsImport.update({
  path: '/rooms',
  getParentRoute: () => rootRoute,
} as any)

const InvitationsRoute = InvitationsImport.update({
  path: '/invitations',
  getParentRoute: () => rootRoute,
} as any)

const AccountRoute = AccountImport.update({
  path: '/account',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserUserIdUserNameRoute = UserUserIdUserNameImport.update({
  path: '/user/$userId/$userName',
  getParentRoute: () => rootRoute,
} as any)

const RoomRoomIdRoomNameRoute = RoomRoomIdRoomNameImport.update({
  path: '/room/$roomId/$roomName',
  getParentRoute: () => rootRoute,
} as any)

const RoomRoomIdRoomNameMembersRoute = RoomRoomIdRoomNameMembersImport.update({
  path: '/members',
  getParentRoute: () => RoomRoomIdRoomNameRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountImport
      parentRoute: typeof rootRoute
    }
    '/invitations': {
      id: '/invitations'
      path: '/invitations'
      fullPath: '/invitations'
      preLoaderRoute: typeof InvitationsImport
      parentRoute: typeof rootRoute
    }
    '/rooms': {
      id: '/rooms'
      path: '/rooms'
      fullPath: '/rooms'
      preLoaderRoute: typeof RoomsImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/users': {
      id: '/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersImport
      parentRoute: typeof rootRoute
    }
    '/room/$roomId/$roomName': {
      id: '/room/$roomId/$roomName'
      path: '/room/$roomId/$roomName'
      fullPath: '/room/$roomId/$roomName'
      preLoaderRoute: typeof RoomRoomIdRoomNameImport
      parentRoute: typeof rootRoute
    }
    '/user/$userId/$userName': {
      id: '/user/$userId/$userName'
      path: '/user/$userId/$userName'
      fullPath: '/user/$userId/$userName'
      preLoaderRoute: typeof UserUserIdUserNameImport
      parentRoute: typeof rootRoute
    }
    '/room/$roomId/$roomName/members': {
      id: '/room/$roomId/$roomName/members'
      path: '/members'
      fullPath: '/room/$roomId/$roomName/members'
      preLoaderRoute: typeof RoomRoomIdRoomNameMembersImport
      parentRoute: typeof RoomRoomIdRoomNameImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AccountRoute,
  InvitationsRoute,
  RoomsRoute,
  SigninRoute,
  SignupRoute,
  UsersRoute,
  RoomRoomIdRoomNameRoute: RoomRoomIdRoomNameRoute.addChildren({
    RoomRoomIdRoomNameMembersRoute,
  }),
  UserUserIdUserNameRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/account",
        "/invitations",
        "/rooms",
        "/signin",
        "/signup",
        "/users",
        "/room/$roomId/$roomName",
        "/user/$userId/$userName"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/account": {
      "filePath": "account.tsx"
    },
    "/invitations": {
      "filePath": "invitations.tsx"
    },
    "/rooms": {
      "filePath": "rooms.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/users": {
      "filePath": "users.tsx"
    },
    "/room/$roomId/$roomName": {
      "filePath": "room/$roomId.$roomName.tsx",
      "children": [
        "/room/$roomId/$roomName/members"
      ]
    },
    "/user/$userId/$userName": {
      "filePath": "user/$userId.$userName.tsx"
    },
    "/room/$roomId/$roomName/members": {
      "filePath": "room/$roomId.$roomName.members.tsx",
      "parent": "/room/$roomId/$roomName"
    }
  }
}
ROUTE_MANIFEST_END */
