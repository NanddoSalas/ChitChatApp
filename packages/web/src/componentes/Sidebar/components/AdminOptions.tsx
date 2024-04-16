import {
  EnvelopeIcon,
  HashtagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { NavigationItem } from './NavigationItem';

export const AdminOptions = () => {
  return (
    <li>
      <div className="font-semibold leading-6 text-gray-400">Administrate</div>

      <ul role="list" className="-mx-2 space-y-1">
        <li>
          <NavigationItem
            name={'Invitations'}
            icon={EnvelopeIcon}
            href={'/invitations'}
          />
        </li>

        <li>
          <NavigationItem name={'Users'} icon={UserIcon} href={'/users'} />
        </li>

        <li>
          <NavigationItem name={'Rooms'} icon={HashtagIcon} href={'/rooms'} />
        </li>
      </ul>
    </li>
  );
};
