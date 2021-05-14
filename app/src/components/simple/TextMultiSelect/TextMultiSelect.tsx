import { IonChip, IonLabel } from '@ionic/react';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import { TextMultiSelectProps } from 'components/simple/TextMultiSelect/TextMultiSelectProps';
import InputChip from 'components/stateful/InputChip/InputChip';
import { sortedUniq, uniq } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

const TextMultiSelect = ({
  content,
  suggestions,
  onChange,
  addText = 'Add item',
}: TextMultiSelectProps): JSX.Element => {
  const [allTexts, setAllTexts] = useState<string[]>([]);
  useEffect(() => {
    setAllTexts(sortedUniq([...allTexts, ...content, ...suggestions].sort()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, suggestions]);

  const chipClicked = useCallback(
    (aText: string) =>
      onChange(
        content.includes(aText)
          ? content.filter((text) => text !== aText)
          : [...content, aText]
      ),
    [onChange, content]
  );

  return (
    <div>
      {allTexts.map(
        (aText: string, index): JSX.Element => (
          <IonChip
            color={content.includes(aText) ? 'primary' : 'dark'}
            outline={false}
            key={index}
            tabIndex={0}
            onKeyPress={(e) => (e.key === 'Enter' ? chipClicked(aText) : null)}
            onClick={() => chipClicked(aText)}
          >
            <IonLabel>{aText}</IonLabel>
          </IonChip>
        )
      )}
      <InputChip
        label={addText}
        placeholder={addText}
        instanceDescriptor={useInstanceDescriptor()}
        submitValueCallback={(newText) => onChange(uniq([...content, newText]))}
      />
    </div>
  );
};

export default TextMultiSelect;
