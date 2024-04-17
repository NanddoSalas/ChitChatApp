import {
  EnvelopeIcon,
  HashtagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { AdminOptionItem } from './AdminOptionItem';

export const AdminOptions = () => {
  return (
    <li>
      <div className="font-semibold leading-6 text-gray-200">Admin Options</div>

      <ul role="list" className="-mx-2 space-y-1">
        <li>
          <AdminOptionItem
            name={'Invitations'}
            icon={EnvelopeIcon}
            href={'/invitations'}
          />
        </li>

        <li>
          <AdminOptionItem name={'Users'} icon={UserIcon} href={'/users'} />
        </li>

        <li>
          <AdminOptionItem name={'Rooms'} icon={HashtagIcon} href={'/rooms'} />
        </li>
      </ul>
    </li>
  );
};
