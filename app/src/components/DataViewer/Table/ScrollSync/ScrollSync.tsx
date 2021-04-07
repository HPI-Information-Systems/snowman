import { ScrollSyncContext } from 'components/DataViewer/Table/ScrollSync/ScrollSyncContext';
import React, { PropsWithChildren, useContext } from 'react';

export default function ScrollSync({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
PropsWithChildren<{}>): JSX.Element {
  const { scrollLeft, scrollWidth } = useContext(ScrollSyncContext);
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${scrollWidth}px`,
          transform: `translateX(-${scrollLeft}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
