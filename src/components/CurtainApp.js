import React from 'react';
import LoggedInBanner from './Layout/LoggedInBanner';
import Footer from './Layout/Footer';
import ProductView from './ProductView/ProductView';
import Curtains from './ProductView/Curtains';

export default class CurtainApp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div>
        <LoggedInBanner />
        <div className="ui container">
            <Curtains />
        </div>
        <Footer />
      </div>
    );
  }
}
