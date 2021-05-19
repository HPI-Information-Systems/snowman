import { useRef } from 'react';

let instanceDescriptor = 0;
const generateNextInstanceDescriptor = (): string => {
  return `InstanceDescriptor-${instanceDescriptor++}`;
};

export const useInstanceDescriptor = (): string => {
  const instanceDescriptorRef = useRef(generateNextInstanceDescriptor());
  return instanceDescriptorRef.current;
};
