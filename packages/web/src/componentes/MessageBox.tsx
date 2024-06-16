import { useState } from 'react';
import { classNames } from '../utils';

interface MessageBoxProps {
  onSendMessage: (body: string) => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage }) => {
  const [value, setValue] = useState('');

  const handleSendMessage = () => {
    if (value) {
      onSendMessage(value);
      setValue('');
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (e.nativeEvent.inputType === 'insertLineBreak') {
      handleSendMessage();

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
          className="textarea textarea-bordered w-full resize-none pr-[72px] overflow-hidden"
          placeholder="Type your message..."
          rows={2}
          value={value}
          onChange={handleChange}
        />

        <div className="absolute mr-[12px]">
          <button
            className="btn btn-ghost btn-square"
            disabled={!value}
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
