import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { Room } from '../../types/api/resources';
import { CreateRoomForm } from '../../types/api/rooms';
import { classNames } from '../../utils';
import { Modal } from './Modal';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPirvate] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate, reset } = useAuthMutation<
    Room,
    Error,
    CreateRoomForm
  >({
    mutationKey: ['/rooms'],
    onSuccess: (newRoom) => {
      queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
        if (oldData) {
          return [...oldData, newRoom];
        }
      });
    },
  });

  const handleCreateRoom = () => mutate({ private: isPrivate, name: roomName });

  useEffect(() => {
    if (isOpen) {
      reset();
      setRoomName('');
      setIsPirvate(false);
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="prose">
        <h2 className="text-center sm:text-start">Create Room</h2>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Room Name</span>
              </div>

              <input
                type="text"
                placeholder="Type here"
                className={classNames(
                  'input input-bordered w-full max-w-xs',
                  isSuccess ? 'input-disabled' : '',
                )}
                value={roomName}
                onChange={(e) => {
                  const { value } = e.target;
                  const last = value.charCodeAt(value.length - 1);

                  if (last >= 65 && last <= 90) {
                    setRoomName(value);
                  } else if (last >= 97 && last <= 122) {
                    setRoomName(value);
                  } else if (
                    last === 32 &&
                    value.length - 2 >= 0 &&
                    value.charCodeAt(value.length - 2) !== 32
                  ) {
                    setRoomName(value);
                  } else if (value.length === 0) {
                    setRoomName(value);
                  }
                }}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Private</span>
              </div>

              <input
                type="checkbox"
                className={classNames(
                  'checkbox m-auto',
                  isSuccess ? 'input-disabled' : '',
                )}
                checked={isPrivate}
                onChange={(e) => setIsPirvate(e.target.checked)}
              />
            </label>
          </div>

          {isSuccess ? (
            <button className={'btn btn-neutral'} onClick={onClose}>
              Close
            </button>
          ) : (
            <button
              className={classNames(
                'btn btn-neutral',
                roomName.length === 0 ? 'btn-disabled' : '',
                isPending ? 'btn-disabled' : '',
              )}
              onClick={handleCreateRoom}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Create'
              )}
            </button>
          )}

          {isSuccess && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Room has been created!</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
