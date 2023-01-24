import { ChangeEvent, ReactNode, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputGroup } from '@chakra-ui/react';
import { ChangeHandler } from 'react-hook-form/dist/types/form';

type Props = {
  register: UseFormRegisterReturn;
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  multiple?: boolean;
  children?: ReactNode;
};

export const FileUpload = (props: Props) => {
  const { register, onSelectFile, width, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, onChange, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
    onChange: ChangeHandler;
  };

  const handleOnClick = () => inputRef.current?.click();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    (async () => {
      await onChange(e);
      onSelectFile(e);
    })();
  };

  return (
    <InputGroup w={width || '100%'} onClick={handleOnClick}>
      <input
        type="file"
        multiple={multiple || false}
        hidden
        onChange={handleOnChange}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};
