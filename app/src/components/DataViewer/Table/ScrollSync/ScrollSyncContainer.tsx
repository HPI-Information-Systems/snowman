import { ScrollSyncContainerProps } from 'components/DataViewer/Table/ScrollSync/ScrollSyncContainerProps';
import { ScrollSyncContext } from 'components/DataViewer/Table/ScrollSync/ScrollSyncContext';
import React, { PropsWithChildren, useState } from 'react';
import { scrollbarWidth } from 'utils/scrollbarWidth';

export default function ScrollSyncContainer({
  scrollWidth,
  children,
}: PropsWithChildren<ScrollSyncContainerProps>): JSX.Element {
  const [scrollLeft, setScrollLeft] = useState(0);
  return (
    <ScrollSyncContext.Provider value={{ scrollWidth, scrollLeft }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `calc(100% - ${scrollbarWidth()}px)`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${scrollbarWidth()}px`,
          overflowY: 'hidden',
          overflowX: 'scroll',
        }}
        onScroll={(e) => {
          setScrollLeft(e.currentTarget.scrollLeft);
        }}
      >
        <div
          style={{
            width: `${scrollWidth}px`,
            height: '100%',
          }}
        ></div>
      </div>
    </ScrollSyncContext.Provider>
  );
}
