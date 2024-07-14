<a id="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <img src="./assets/logo.png" alt="todo: get a logo" style="border-radius: 12px;" />

  <p align="center">
    Full Stack room-based Chat Application
    <br />
    <a href="#"><strong>Try Demo</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#design-and-development-of-the-project"
        >Design and Development of the Project</a
      >
      <ul>
        <li><a href="#user-interface">User Interface</a></li>
        <li><a href="#database">Database</a></li>
        <li>
          <a href="#authentication-and-authorization"
            >Authentication and Authorization</a
          >
        </li>
        <li><a href="#api-overview">API Overview</a></li>
        <li><a href="#real-time-architecture">Real Time Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![project screenshot](./assets/screenshot.jpg)

ChitChatApp is a room-based chat application. This Full Stack project enables users to create, join, and engage in chat rooms seamlessly. With a focus on real-time communication
ChitChatApp is built with a modern tech stack, combining powerful backend technologies with sleek front-end frameworks to deliver a smooth and engaging user experience.

### Features

- **Room Creation and Management:** Easily create and manage multiple chat rooms.
- **User Authentication:** Secure user login and registration using modern authentication techniques.
- **Responsive Design:** Accessible on both desktop and mobile devices for a seamless experience.
- **Real-Time Messaging:** Enjoy instant messaging powered by WebSockets for real-time communication.

### Motivation

The primary motivation behind creating ChitChatApp was to enhance my skills in both backend and frontend development. This project serves as a hands-on platform to achieve the following goals:

- **Learn a New Backend Technology:** One of the key objectives was to gain proficiency in Java and Spring. By integrating these technologies, I aimed to build a robust and scalable backend system that supports real-time communication and efficient data management.

- **Enhance Frontend Development Skills:** Another important goal was to deepen my knowledge as a frontend developer. This project provided an opportunity to work with modern frontend frameworks and tools, focusing on creating a seamless and responsive user interface that enhances the user experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DESIGN AND DEVELOPMENT OF THE PROJECT -->

## Design and Development of the Project

### Database

![database schema](./assets/database.jpg)

### Authentication and Authorization

#### Authentication

The API is secured by JWT Authentication, where a user can choose to sign in using credentials (email and password) or a Google Account to get an Access Token and use it for subsequent requests:

```mermaid
sequenceDiagram
    participant R as React App
    participant S as Spring Server
    participant G as Google

    R -->> + S: GET /rooms
    S -->> - R: HTTP 401 Unauthorized

    R -->> + S: <br/><br/><br/>POST /auth/signin, credentials
    S -->> - R: HTTP 200 OK, accessToken

    R -->> + G: <br/><br/><br/>Authenticate with Google and Consent
    G -->> - R: Authorization Code
    R -->> + S: POST /auth/signin/google, authorization code
    S -->> + G: Exchange authorization code
    G -->> - S: ID Token
    S -->> - R: HTTP 200 OK, accessToken

    R -->> + S: <br/><br/><br/>GET /roms, accessToken
    S -->> - R: HTTP 200 OK, body
```

#### Authrorization

Every authenticated user will have a role assigned to it, it could be:

- **Member:** A member can send, see, and receive messages from other users, public rooms and private rooms where he is a member of.
- **Admin:** An admin can do all a member can do, and also manage invitation and rooms (can't manage invitations or rooms created by other users).
- **ServerAdmin:** A server admin can do all an admin can do, and also he's able to update user's role (from member to admin, back and forth).

### API Overview

---

#### Authentication

<details>
 <summary><code>POST</code> <code><b>/auth/signup</b></code> <code>(Sign up with credentials) (Role required: none)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>email</td><td>string</td><td>true</td></tr>
<tr><td>password</td><td>string</td><td>true</td></tr>
<tr><td>fullName</td><td>string</td><td>true</td></tr>
<tr><td>inviteCode</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
<tr><td>404</td><td>

```json
{
  "data": null,
  "errors": {
    "inviteCode": "Invalid invitation code",
    "email": "Email already in use"
  }
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/auth/signup/google</b></code> <code>(Sign up with Google) (Role required: none)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>code</td><td>string</td><td>true</td></tr>
<tr><td>inviteCode</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
<tr><td>404</td><td>

```json
{
  "data": null,
  "errors": {
    "message": "Unable to Sign up with that Google Account, try a different one!"
  }
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/auth/signin</b></code> <code>(Sign in with credential) (Role required: none)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>email</td><td>string</td><td>true</td></tr>
<tr><td>password</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhbGljZS5qb2huc29uQGV4YW1wbGUuY29tIiwic2NvcGUiOiJTZXJ2ZXJBZG1pbiJ9.kC3rk6NQSbDCEJTciLDSPjZF7JO7eraa6imLn_yO3PA",
    "user": {
      "id": 1,
      "fullName": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
      "about": "Loves hiking and outdoor adventures.",
      "role": "ServerAdmin",
      "creationDate": "2024-07-12 20:12:44.825401",
      "hasPassword": true,
      "hasGoogle": false,
      "hasGigHub": false
    }
  },
  "errors": null
}
```

</td></tr>
<tr><td>404</td><td>

```json
{
  "data": null,
  "errors": {
    "message": "Invalid credentials"
  }
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/auth/signin/google</b></code> <code>(Sign in with Google) (Role requires: none)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>code</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhbGljZS5qb2huc29uQGV4YW1wbGUuY29tIiwic2NvcGUiOiJTZXJ2ZXJBZG1pbiJ9.kC3rk6NQSbDCEJTciLDSPjZF7JO7eraa6imLn_yO3PA",
    "user": {
      "id": 1,
      "fullName": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
      "about": "Loves hiking and outdoor adventures.",
      "role": "ServerAdmin",
      "creationDate": "2024-07-12 20:12:44.825401",
      "hasPassword": true,
      "hasGoogle": false,
      "hasGigHub": false
    }
  },
  "errors": null
}
```

</td></tr>
<tr><td>404</td><td>

```json
{
  "data": null,
  "errors": {
    "message": "User does not exist, Sign up first!"
  }
}
```

</td></tr>
</table>

</details>

---

#### Users

<details>
 <summary><code>GET</code> <code><b>/users</b></code> <code>(Retrieve all Users) (Role requires: Member)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "id": 1,
      "fullName": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
      "about": "Loves hiking and outdoor adventures.",
      "role": "ServerAdmin",
      "creationDate": "2024-07-12 20:12:44.825401"
    },
    {
      "id": 2,
      "fullName": "Bob Smith",
      "email": "bob.smith@example.com",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
      "about": "Avid reader and writer.",
      "role": "Member",
      "creationDate": "2024-07-12 20:12:44.825401"
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>PUT</code> <code><b>/users/${userId}/role</b></code> <code>(Update User's Role) (Role requires: ServerAdmin)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>role</td><td>"Member" | "Admin"</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>PUT</code> <code><b>/users/${userId}/profile</b></code> <code>(Update User's Profile) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>fullName</td><td>string</td><td>true</td></tr>
<tr><td>about</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>PUT</code> <code><b>/users/${userId}/password</b></code> <code>(Update User's Password) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>oldPassword</td><td>string</td><td>true</td></tr>
<tr><td>newPassword</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
<tr><td>400</td><td>

```json
{
  "data": null,
  "errors": {
    "oldPassword": "Invalid old password"
  }
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>PUT</code> <code><b>/users/${userId}/google</b></code> <code>(Connect Google Account) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>code</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
<tr><td>400</td><td>

```json
{
  "data": null,
  "errors": {
    "message": "Unable to connect that Google Account, try a different one!"
  }
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>DELETE</code> <code><b>/users/${userId}/google</b></code> <code>(Disconnect Google Account) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

---

#### Invitations

<details>
 <summary><code>GET</code> <code><b>/invitations</b></code> <code>(Retrieve all Invitations) (Role requires: Admin)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "id": 1,
      "inviteCode": "YAgSKjtGGVseZgva",
      "uses": 2,
      "maxUses": 10,
      "revoked": false,
      "creatioDate": "2024-07-12 20:12:44.837065"
    },
    {
      "id": 4,
      "inviteCode": "YAgSKjtGGVseZgva",
      "uses": 1,
      "maxUses": 3,
      "revoked": false,
      "creatioDate": "2024-07-12 20:13:52.06593"
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/invitations</b></code> <code>(Create Invitation) (Role requires: Admin)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>limit</td><td>number</td><td>false</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "id": 5,
    "inviteCode": "BU5DOkGngG57EVSb",
    "uses": 0,
    "maxUses": 3,
    "revoked": false,
    "creatioDate": "2024-07-12 20:45:01.546282"
  },
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>DELETE</code> <code><b>/invitations/${invitationId}</b></code> <code>(Revoke Invitation) (Role requires: Admin)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

---

#### Rooms

<details>
 <summary><code>GET</code> <code><b>/rooms</b></code> <code>(Retrieve all Rooms) (Role requires: Member)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "id": 1,
      "roomName": "General Chat",
      "creatorId": 1,
      "creationDate": "2024-07-12 20:47:21.250011",
      "hasAccess": true,
      "private": false
    },
    {
      "id": 2,
      "roomName": "Gaming Room",
      "creatorId": 3,
      "creationDate": "2024-07-12 20:47:21.250011",
      "hasAccess": false,
      "private": false
    },
    {
      "id": 3,
      "roomName": "Admin Room",
      "creatorId": 1,
      "creationDate": "2024-07-12 20:47:21.250011",
      "hasAccess": true,
      "private": true
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/rooms</b></code> <code>(Create Room) (Role requires: Admin)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>name</td><td>string</td><td>true</td></tr>
<tr><td>private</td><td>boolean</td><td>false</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "id": 6,
    "roomName": "Awesome private room",
    "creatorId": 1,
    "creationDate": "2024-07-12 20:52:20.460003",
    "hasAccess": true,
    "private": true
  },
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>PUT</code> <code><b>/rooms/${roomId}</b></code> <code>(Update Room) (Role requires: Admin)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>name</td><td>string</td><td>true</td></tr>
<tr><td>private</td><td>boolean</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>DELETE</code> <code><b>/rooms/${roomId}</b></code> <code>(Delete Room) (Role requires: Admin)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

---

#### Members

<details>
 <summary><code>GET</code> <code><b>/rooms/${roomId}/members</b></code> <code>(Retrieve all Room Members) (Role requires: Member)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "userId": 1,
      "memberSince": "2024-07-12 20:47:21.255017"
    },
    {
      "userId": 2,
      "memberSince": "2024-07-12 20:47:21.255017"
    },
    {
      "userId": 3,
      "memberSince": "2024-07-12 20:47:21.255017"
    },
    {
      "userId": 4,
      "memberSince": "2024-07-12 20:47:21.255017"
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/rooms/${roomId}/members</b></code> <code>(Create Room Member) (Role requires: Admin)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>userId</td><td>number</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "roomId": 1,
    "userId": 2,
    "creationDate": "2024-07-12 21:01:00.173227"
  },
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>DELETE</code> <code><b>/rooms/${roomId}/members/${userId}</b></code> <code>(Delete Room Member) (Role requires: Admin)</code></summary>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": null,
  "errors": null
}
```

</td></tr>
</table>

</details>

---

#### Messages

<details>
 <summary><code>GET</code> <code><b>/users/${userId}/messages</b></code> <code>(Retrieve paginated Direct Messages) (Role requires: Member)</code></summary>

##### Query Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>cursor</td><td>number</td><td>false</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "id": 2,
      "senderId": 2,
      "creationDate": "2024-07-12 20:47:21.266432",
      "body": "Sure Alice, I will check it now."
    },
    {
      "id": 1,
      "senderId": 1,
      "creationDate": "2024-07-12 20:47:21.266432",
      "body": "Hey Bob, can you check the admin panel?"
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>GET</code> <code><b>/rooms/${roomId}/messages</b></code> <code>(Retrieve paginated Room Messages) (Role requires: Member)</code></summary>

##### Query Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>cursor</td><td>number</td><td>false</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": [
    {
      "id": 9,
      "senderId": 1,
      "creationDate": "2024-07-12 20:47:21.260368",
      "body": "Here is a song I like."
    },
    {
      "id": 8,
      "senderId": 5,
      "creationDate": "2024-07-12 20:47:21.260368",
      "body": "Let’s share some music recommendations."
    }
  ],
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/users/${userId}/messages</b></code> <code>(Send Direct Message) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>body</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "id": 12,
    "senderId": 1,
    "creationDate": "2024-07-12 21:09:25.748969",
    "body": "Hi there"
  },
  "errors": null
}
```

</td></tr>
</table>

</details>

<details>
 <summary><code>POST</code> <code><b>/rooms/${roomId}/messages</b></code> <code>(Send Room Message) (Role requires: Member)</code></summary>

##### Body Parameters

<table>
<tr><td>Name</td><td>Type</td><td>Required</td></tr>
<tr><td>body</td><td>string</td><td>true</td></tr>
</table>

##### Responses

<table>
<tr><td>Status</td><td>Response Body Example</td></tr>
<tr><td>200</td><td>

```json
{
  "data": {
    "id": 7,
    "senderId": 1,
    "creationDate": "2024-07-12 21:09:48.029569",
    "body": "Hi there"
  },
  "errors": null
}
```

</td></tr>
</table>

</details>

---

### Real Time Architecture

Real-Time functionality is built using STOMP (Streaming Text Oriented Messaging Protocol) over WebSockets, where a user hits an API endpoint that creates, updates or deletes resources and those changes will be sended to subscribed clients.

Endpoints where a client can suscribe to:

| Public STOMP Destination |
| ------------------------ |
| /topic/new-user          |
| /topic/update-user       |
| /topic/new-room          |
| /topic/update-room       |
| /topic/delete-room       |
| /topic/new-room-message  |

| Filtered STOMP Destinations          | Who recieves                         |
| ------------------------------------ | ------------------------------------ |
| /user/queue/update-role              | User who's role been updated         |
| /user/queue/new-private-room-message | Members of the private room          |
| /user/queue/new-direct-message       | User whose message is sent to        |
| /user/queue/new-room-member          | User who became a room's member      |
| /user/queue/delete-room-member       | User whose no longer a room's member |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

### Installation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.
See [LICENSE](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
````
