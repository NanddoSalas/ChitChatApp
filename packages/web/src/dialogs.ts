import { Dialog } from './types';

export const MakeAdminDialog: Dialog = {
  title: 'Give Admin Privileges',
  text: 'Are you sure you want to give that user Admin Privileges? \
    The user will be able to manage rooms and invitations. \
    ',
  status: 'warning',
  actionPlaceholder: 'Make Admin',
};

export const RevokeAdminDialog: Dialog = {
  title: 'Revoke Admin Privileges',
  text: 'Are you sure you want to remove Admin Privileges from that user? \
    The user will no longer be able to manage rooms and invitations. \
    ',
  status: 'warning',
  actionPlaceholder: 'Revoke Privileges',
};

export const RevokeInvitationDialog: Dialog = {
  title: 'Revoke Invitation',
  text: 'Are you sure you want to revoke that invitation? \
    That invitation code will be useless after that. \
    ',
  status: 'warning',
  actionPlaceholder: 'Revoke',
};

export const MakeRoomPrivate: Dialog = {
  title: 'Make Room Private',
  text: 'Are you sure you want to make that room private? \
    Only room members will be able to see and send messages in the room. \
    ',
  status: 'warning',
  actionPlaceholder: 'Make Private',
};

export const MakeRoomPublic: Dialog = {
  title: 'Make Room Public',
  text: 'Are you sure you want to make that room public? \
    Anyone will be able to see and send messages in the room. \
    ',
  status: 'warning',
  actionPlaceholder: 'Make Public',
};

export const DeleteRoomDialog: Dialog = {
  title: 'Delete Room',
  text: "Are you sure you want to delete the Room? \
    All Room's messages will be permanently removed from our servers forever. \
    This action cannot be undone.",
  status: 'danger',
  actionPlaceholder: 'Delete',
};

export const KickOutUserdialog: Dialog = {
  title: 'Kick out User',
  text: "Are you sure you want to Kick the User out of the Room? \
    The User won't be able to see, send and receive messages from the Room. \
    All kicked out User's messages will remain.",
  status: 'warning',
  actionPlaceholder: 'Kick out',
};
