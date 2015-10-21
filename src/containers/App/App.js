import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import config from '../../config';

const NavbarLink = ({to, className, component, children}) => {
  const Comp = component || Link;

  return (
    <Comp to={to} className={className} activeStyle={{
      color: '#33e0ff'
    }}>
      {children}
    </Comp>
  );
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  state = {
    showDropdown: false
  }

  handleToggleDropdown() {
    this.setState({showDropdown: !this.state.showDropdown});
  }

  render() {
    const styles = require('./App.scss');
    const {showDropdown} = this.state;
    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app.meta}/>
        <nav className="navbar navbar-default">
          <div className="container">
            <NavbarLink to="/" className="navbar-brand" component={IndexLink}>
              <img src={require('./logo.png')} />
            </NavbarLink>

            <ul className="nav navbar-nav">
              <li><NavbarLink to="/support">Support</NavbarLink></li>

              <li className={'dropdown ' + (showDropdown ? 'open' : '')}
                  onClick={::this.handleToggleDropdown}>
                <a href="#" className="dropdown-toggle">Learn About Us <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><NavbarLink to="/technology">Technology</NavbarLink></li>
                  <li><NavbarLink to="/history">History</NavbarLink></li>
                  <li><NavbarLink to="/team">Our Team</NavbarLink></li>
                </ul>
              </li>

              <li><NavbarLink to="/widgets">Widgets</NavbarLink></li>
              <li><NavbarLink to="/survey">Survey</NavbarLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://github.com/erikras/react-redux-universal-hot-example"
                   target="_blank" title="View on Github"><i className="fa fa-github"/></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <footer className="footer">
          <div className="container">
            <p>
              <a href="http://www.facebook.com/pages/Brasilia-USA/126213125623">
                <img src={require('./facebook.png')} />
              </a>
            </p>
            <p className="text-muted">
              Copyright &copy;{new Date().getFullYear()}
            </p>
            <p className="text-muted">
              info@brasiliausa.com
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
