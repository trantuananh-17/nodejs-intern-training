import {colorOptions} from '@assets/const/themeOptions';
import {hex8ToRgba} from '@assets/helpers/convertColor';
import {InlineGrid} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

export default function ThemeColorSelect({hex, onSelect}) {
  console.log(hex);

  return (
    <InlineGrid columns={{xs: 8, sm: 8, md: 8}} gap="100">
      {colorOptions.map(({color}, index) => {
        const {red, green, blue, alpha} = hex8ToRgba(color);

        const background =
          alpha === 1
            ? `rgb(${red}, ${green}, ${blue})`
            : `rgba(${red}, ${green}, ${blue}, ${alpha})`;

        return (
          <div key={index} style={{width: 16, height: 16}}>
            <span>
              <div
                onClick={() => {
                  console.log(color);

                  onSelect(color);
                }}
                style={{
                  background,
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  outline: 'none',
                  borderRadius: '3px',
                  boxShadow: ` ${
                    color === hex
                      ? `rgba(0,0,0,0.15) 0 0 0 1px inset,
                        rgb(${red}, ${green}, ${blue}) 0 0 4px`
                      : 'rgba(0,0,0,0.15) 0 0 0 1px inset'
                  }`
                }}
              />
            </span>
          </div>
        );
      })}
    </InlineGrid>
  );
}

ThemeColorSelect.propTypes = {
  hex: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};
