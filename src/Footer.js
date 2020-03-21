import React from 'react';
import "./Footer.css"

export default function Footer() {
    return (
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

    );
}
