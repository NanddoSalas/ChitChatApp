import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { SendMessageErrors, SendMessageForm } from '../types/api/messages';
import { Message } from '../types/api/resources';
import { classNames } from '../utils';

interface MessageBoxProps {
  target: 'room' | 'user';
  targetId: number;
  disabled: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  target,
  targetId,
  disabled,
}) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState('');

  const { mutate, isPending } = useAuthMutation<
    Message,
    SendMessageErrors,
    SendMessageForm
  >({
    mutationKey: [`/${target}s/${targetId}/messages`],
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(
        [`/${target}s/${targetId}/messages`],
        (oldData) => {
          if (oldData) {
            return [...oldData, newMessage];
          }
        },
      );

      setValue('');
    },
  });

  const handleSendMessage = () => {
    if (value) {
      mutate({ body: value });
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (e.nativeEvent.inputType === 'insertLineBreak') {
      if (!isPending) {
        handleSendMessage();
      }

      return;
    }

    setValue(e.target.value);
  };

  return (
    <div
      className={classNames(
        'px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-1',
        'pb-4 sm:pb-6 lg:pb-8',
        'pt-4 sm:pt-6 lg:pt-8',
        'border-t border-gray-300',
      )}
    >
      <div className="flex justify-end items-center">
        <textarea
          className={classNames(
            'textarea textarea-bordered w-full resize-none pr-[72px] overflow-hidden',
            disabled ? 'input-disabled' : '',
          )}
          placeholder="Type your message..."
          rows={2}
          value={value}
          onChange={handleChange}
        />

        <div className="absolute mr-[12px]">
          <button
            className={classNames(
              'btn btn-ghost btn-square',
              isPending ? 'btn-disabled' : '',
              disabled ? 'btn-disabled' : '',
            )}
            disabled={!value}
            onClick={handleSendMessage}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
