import React, { Component } from 'react';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/us-flag@3x.png';

class DefaultHeader extends Component {
  render() {
    return (
      <AppNavbarBrand full={{ src: logo, width: 150, height: 25, alt: 'mmmerica' }} minimized={{ src: logo, width: 45, height: 45, alt: 'mmmerica' }} />
    )
  }
}

export default DefaultHeader;