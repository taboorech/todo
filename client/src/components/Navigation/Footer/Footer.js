import React from "react";
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="page-footer Footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5>Todo</h5>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5>Links</h5>
            <ul>
              <li><a className="text-lighten-3" href="https://github.com/taboorech">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
      </div>
    </footer>
  )
}