import { Dialog } from './types';

export const MakeAdminDialog: Dialog = {
  title: 'Give Admin Privileges',
  text: '',
  status: 'warning',
  actionPlaceholder: 'Make Admin',
};

export const RevokeAdminDialog: Dialog = {
  title: 'Revoke Admin Privileges',
  text: '',
  status: 'warning',
  actionPlaceholder: 'Revoke Privileges',
};

export const RevokeInvitationDialog: Dialog = {
  title: 'Revoke Invitation',
  text: '',
  status: 'warning',
  actionPlaceholder: 'Revoke',
};

export const MakeRoomPrivate: Dialog = {
  title: 'Make Room Private',
  text: '',
  status: 'warning',
  actionPlaceholder: 'Make Private',
};

export const MakeRoomPublic: Dialog = {
  title: 'Make Room Public',
  text: '',
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
