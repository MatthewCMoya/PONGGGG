import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md="6">
              <div className="clearfix">
                <h4 className="text-white pt-3">Oops! You're lost.</h4>
                <p className="text-muted">The page you are looking for was not found.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
