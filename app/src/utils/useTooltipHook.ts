import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const useTooltip = (): void => {
  useEffect((): void => {
    ReactTooltip.rebuild();
  });
};

export default useTooltip;
