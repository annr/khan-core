import React from 'react';
import Container from "./Container"
import SidePanel from "./SidePanel"

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        {/* <h1>Khan Academy Common Core</h1> */}
        <SidePanel />
        <Container />
        <footer>
          <a
            className="project-link"
            href="https://github.com/annr/khan-core"
            target="_blank"
            rel="noopener noreferrer"
          >
            View this project on GitHub
        </a>
        </footer>
      </React.Fragment>
    );
  }

}

export default App;
