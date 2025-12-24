import React from 'react';
import PropTypes from 'prop-types';
import './ThemePopInput.scss';

export default function ThemePopInput({options, theme, onChange}) {
  return (
    <>
      {options.map((option, key) => (
        <div key={key} onClick={() => onChange(option)}>
          <div
            className={`Avada-Chose-Theme ${
              theme === option.theme ? 'Avada-Chose-ThemeSelected' : ''
            }`}
          >
            <div
              className="Avada-Chose-Theme_Button"
              style={
                option.isGradient
                  ? {
                      backgroundImage: `linear-gradient(to right, ${option.actionColorStart}, ${option.actionColorEnd})`
                    }
                  : {
                      backgroundImage: `url(${option.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: '100% 100%',
                      backgroundRepeat: 'no-repeat'
                    }
              }
            ></div>
            <div className="Avada-Chose-Theme_Name">
              <span>{option.themeName}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

ThemePopInput.propTypes = {
  options: PropTypes.array,
  theme: PropTypes.string,
  onChange: PropTypes.func
};
