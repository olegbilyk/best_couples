import React, { Component } from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import Loader from './Loader'
import { loadRandomUser } from '../AC/index'
import BestUsers from './BestCouples'
import PropTypes from 'prop-types'

const Content = styled('div')`
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: #434345;
`
const H1 = styled('h1')`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;

  ::after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    margin: 20px auto 40px;
    background: linear-gradient(90deg, #42b574 0%, #84c450 100%);
  }
`
const H3 = styled('h3')`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  color: #cf0000;
`

class Page extends Component {
  componentDidMount () {
    const {users, loadRandomUser} = this.props
    if (!users.loading && !users.loaded) loadRandomUser()
  }

  getBody () {
    const {users} = this.props
    if (users.loading) return <Loader />
    if (users.fail) return <H3>Load data fail :(</H3>

    return (
      <BestUsers users={users.entities} />
    )
  }

  render () {
    return (
      <Content>
        <H1>
          Best couples
        </H1>
        {this.getBody()}
      </Content>
    )
  }
}

Page.propTypes = {
  users: PropTypes.object.isRequired,
  loadRandomUser: PropTypes.func.isRequired
}

export default connect(state => ({
  users: state.users
}), {loadRandomUser})(Page)
