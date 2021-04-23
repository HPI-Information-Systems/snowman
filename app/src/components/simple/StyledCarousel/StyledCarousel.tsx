import 'components/simple/StyledCarouselarousel/StyledCarouselStyles.css';

import { StyledCarouselProps } from 'components/simple/StyledCarousel/StyledCarouselProps';
import React from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';

const StyledCarousel = ({
  children,
  itemsToScroll = 5,
  itemsToShow = 5,
}: StyledCarouselProps): JSX.Element => (
  <ReactElasticCarousel
    isRTL={false}
    itemsToShow={itemsToShow}
    itemsToScroll={itemsToScroll}
    breakPoints={[
      { width: 1, itemsToShow: 1, itemsToScroll: 1 },
      { width: 500, itemsToShow: 2, itemsToScroll: 2 },
      { width: 700, itemsToShow: 3, itemsToScroll: 3 },
      { width: 900, itemsToShow: 4, itemsToScroll: 4 },
      { width: 1100, itemsToShow: 5, itemsToScroll: 5 },
    ]}
  >
    {children.map(
      (child: JSX.Element): JSX.Element => (
        <div key={'div-outer' + child.key}>{child}</div>
      )
    )}
  </ReactElasticCarousel>
);
export default StyledCarousel;
