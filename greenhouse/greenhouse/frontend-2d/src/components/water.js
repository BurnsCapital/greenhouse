import React from 'react';
import axios from 'axios';

class Water extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  getDataFromDB(){
    fetch("http://172.16.0.106:3300/api/getWater")
    .then(data => data.json())
    .then(res => this.setState({data: res.boolEntries}));
}
  render() {
    const { data } = this.state;
    return <ul>
            {data.map( point => 
                
                <li key={point.lku}>
                {point.uniqueId}
                {point.status}
                </li>
    )}</ul>;
  }

  componentDidMount() {
    this.getDataFromDB();
    setInterval(this.getDataFromDB(),5000);
  }
}

export default Water;
