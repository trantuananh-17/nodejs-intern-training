import {colorOptions} from '@assets/const/themeOptions';
import {hex8ToRgba, normalizeHexToHex8} from '@assets/helpers/convertColor';
import {InlineGrid} from '@shopify/polaris';
import React from 'react';

export default function ThemeColorSelect() {
  return (
    <InlineGrid columns={{xs: 8, sm: 8, md: 8}} gap="100">
      {colorOptions.map(({color}, index) => {
        const hex8 = normalizeHexToHex8(color);
        const {red, green, blue, alpha} = hex8ToRgba(hex8);

        const background =
          alpha === 1
            ? `rgb(${red}, ${green}, ${blue})`
            : `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        return (
          <div key={index} style={{width: 16, height: 16}}>
            <span>
              <div
                style={{
                  background,
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  outline: 'none',
                  borderRadius: '3px',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset'
                }}
              />
            </span>
          </div>
        );
      })}
    </InlineGrid>
  );
}

ThemeColorSelect.propTypes = {};
