import React from 'react';
import Container from "./Container"

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="containerWrapper">
          {/* <h1>Khan Academy Common Core</h1> */}
          <Container />
        </div>
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
