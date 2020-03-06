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
          <span>Made with 💖 for teachers and learners.</span>
          <a
            style={{ "float": "right" }}
            className="project-link"
            href="https://github.com/annr/khan-core"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub project
        </a>
        </footer>
      </React.Fragment>
    );
  }

}

export default App;
