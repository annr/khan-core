import React from 'react';
import Container from "./Container"
//import SidePanel from "./SidePanel"

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        {/* <h1>Khan Academy Common Core</h1> */}
        <Container />
        <footer>
          <span>Made with <span role="image" aria-label="love">💖</span> for teachers and learners.</span>
          <a
            className="github-link"
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
