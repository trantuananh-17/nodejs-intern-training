import PropTypes from 'prop-types';
import React from 'react';

export default function StickyProductVariant({label, options, value, onChange}) {
  console.log(value, options);
  return (
    <div className="Avada-OptionGroup">
      <div className="Avada-VariantLabel">{label}:</div>
      <div className="Avada-VariantOptionValues">
        {options.map((option, key) => (
          <button
            key={key}
            className={`Avada-VariantOptionValue ${value === option.value ? '-selected' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
}

StickyProductVariant.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func
};
