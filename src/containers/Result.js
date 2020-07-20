import React, {Component} from 'react';
import ItemDetail from './ItemDetail';
import Prediction from './Prediction';

export default class Result extends Component {
  render() {
    const {currentPage} = this.props;

    const checkCurretPage = () => {
      if (currentPage == 'evaluate') {
        return <ItemDetail />;
      } else if (currentPage == 'testing') {
        return <TestModel />;
      } else if (currentPage === 'prediction') {
        return <Prediction />;
      }
    };
    return (
      <div>
        <Menu />
        {checkCurretPage()}
      </div>
    );
  }
}
