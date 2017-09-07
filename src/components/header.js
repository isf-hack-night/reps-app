import { h, Component } from 'preact'
import queryAPI from '../query_api'

import { Navbar, Nav, NavItem  } from 'react-bootstrap';


class Header extends Component {
  render() {
    const paramsData = queryAPI.parse()

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><img class="logo" src="./src/assets/StateStrong-logo-5-CA-notagline-3-3.png" /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}

export default Header
