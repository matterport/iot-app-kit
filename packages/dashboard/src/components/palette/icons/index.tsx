import React from 'react';

import InputComponent from './input-component';

import './index.css';

const IconMap: { [key in string]: React.FC } = {
  input: InputComponent,
};

type PaletteComponentIconProps = {
  Icon: any;
};

const PaletteComponentIcon: React.FC<PaletteComponentIconProps> = ({ Icon }) => {
  return <Icon />;
};

export default PaletteComponentIcon;
