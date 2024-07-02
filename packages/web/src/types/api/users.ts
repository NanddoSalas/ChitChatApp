// put /users/:userId/role

export interface UpdateRoleForm {
  role: 'Admin' | 'Member';
}

// post /users/${userId}/password

export interface UpdatePasswordForm {
  oldPassword?: string;
  newPassword: string;
}

export interface UpdatePasswordErrors {
  oldPassword: string;
}
