import {
  EnvelopeIcon,
  HashtagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Skeleton } from '../../Skeleton';
import { AdminOptionItem } from './AdminOptionItem';

interface AdminOptionsProps {
  fetching: boolean;
}

export const AdminOptions: React.FC<AdminOptionsProps> = ({ fetching }) => {
  return (
    <li>
      <div className="font-semibold leading-6 text-gray-200">Admin Options</div>

      <ul role="list" className="-mx-2 space-y-1">
        {fetching ? (
          <>
            <li>
              <Skeleton square />
            </li>

            <li>
              <Skeleton square />
            </li>

            <li>
              <Skeleton square />
            </li>
          </>
        ) : (
          <>
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
              <AdminOptionItem
                name={'Rooms'}
                icon={HashtagIcon}
                href={'/rooms'}
              />
            </li>
          </>
        )}
      </ul>
    </li>
  );
};
