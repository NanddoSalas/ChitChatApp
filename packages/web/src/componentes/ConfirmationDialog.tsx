import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store';
import { classNames } from '../utils';
import { Modal } from './Modal';

export const ConfirmationDialog: React.FC = () => {
  const closeDialog = useStore((state) => state.closeConfirmationDialog);
  const { dialog, isOpen } = useStore((state) => state.confirmationDialog);

  return (
    <Modal isOpen={isOpen} onClose={() => closeDialog(false)}>
      <div className="sm:flex sm:items-start">
        <div
          className={classNames(
            'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
            dialog?.status === 'danger' ? 'bg-red-100' : 'bg-blue-100',
          )}
        >
          <ExclamationTriangleIcon
            className={classNames(
              'h-6 w-6',
              dialog?.status === 'danger' ? 'text-red-600' : 'text-blue-600',
            )}
            aria-hidden="true"
          />
        </div>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            {dialog?.title}
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">{dialog?.text}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 flex justify-end space-x-4">
        <button
          type="button"
          className={classNames('btn btn-neutral btn-outline btn-sm lg:btn-md')}
          onClick={() => closeDialog(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          className={classNames(
            'btn btn-neutral btn-sm lg:btn-md',
            dialog?.status === 'danger' ? 'btn-error' : 'btn-info',
          )}
          onClick={() => closeDialog(true)}
        >
          {dialog?.actionPlaceholder}
        </button>
      </div>
    </Modal>
  );
};
