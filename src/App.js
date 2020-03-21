import React from 'react';
import Container from "./Container"
import SidePanel from './SidePanel';
// import Footer from './Footer';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        {/* <h1>Khan Academy Common Core</h1> */}
        <SidePanel />
        <Container />
        {/* <Footer /> */}
      </React.Fragment>
    );
  }

}

export default App;
