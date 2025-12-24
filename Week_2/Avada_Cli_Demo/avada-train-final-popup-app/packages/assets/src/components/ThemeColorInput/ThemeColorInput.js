import {
  InlineStack,
  BlockStack,
  Text,
  Box,
  Popover,
  ColorPicker,
  Divider,
  Scrollable
} from '@shopify/polaris';
import React, {useEffect, useRef, useState} from 'react';
import './ThemeColorInput.scss';
import PropTypes from 'prop-types';
import ThemeColorSelect from '../ThemeColorSelect/ThemeColorSelect';
import {hexToHsba, hsbaToHex8} from '@assets/helpers/convertColor';

export default function ThemeColorInput({label, colorHex, onChange}) {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7
  });

  useEffect(() => {
    if (!colorHex) return;

    const next = hexToHsba(colorHex);
    const currentHex = hsbaToHex8(color);

    if (currentHex !== colorHex) {
      setColor(next);
    }
  }, [colorHex]);

  const debounceRef = useRef(null);

  const handleChange = newColor => {
    setColor(newColor);

    // If a debounce timer already exists, clear it
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Create a new debounce timer
    // The callback will only run after stops changing the color
    debounceRef.current = setTimeout(() => {
      onChange(hsbaToHex8(newColor));
    }, 300);
  };

  const hex = hsbaToHex8(color);

  return (
    <InlineStack gap="300">
      <Popover
        active={active}
        activator={
          <div className="Avada-ReactColor" onClick={() => setActive(true)}>
            <div className="Avada-ColorBlock" style={{backgroundColor: `${hex}`}} />
          </div>
        }
        onClose={() => setActive(false)}
      >
        <Scrollable>
          <Popover.Pane padding="200" fixed>
            <Box minWidth="200px" padding="300">
              <BlockStack gap={300}>
                <ColorPicker color={color} onChange={handleChange} allowAlpha />

                <Divider />

                <ThemeColorSelect
                  onSelect={value => {
                    setColor(hexToHsba(value)); // sync local ngay
                    onChange(value); // update context
                  }}
                  hex={colorHex}
                />
              </BlockStack>
            </Box>
          </Popover.Pane>
        </Scrollable>
      </Popover>

      <Box minWidth="120px">
        <BlockStack gap="100">
          <Text>{label}</Text>
          <Text tone="subdued">{colorHex}</Text>
        </BlockStack>
      </Box>
    </InlineStack>
  );
}

ThemeColorInput.propTypes = {
  label: PropTypes.string,
  colorHex: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
