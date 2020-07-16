import React from 'react';
import Container from "./Container"
// import SidePanel from './SidePanel';
import Legend from './Legend';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        {/* <h1>Khan Academy Common Core</h1> */}
        {/* <SidePanel /> */}
        <Container />
        <Legend />
      </React.Fragment>
    );
  }

}

export default App;
