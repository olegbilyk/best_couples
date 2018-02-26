import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const Ul = styled('ul')`
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 30px;
  grid-template-columns: repeat(auto-fill, 280px);
  max-width: 1500px;
  margin: 10px auto;
  padding-right: 30px;
  padding-left: 30px;
  list-style: none;
  counter-reset: li;

  li {
    ::before {
      content: counter(li, decimal-leading-zero);
      counter-increment: li;
      display: block;
      margin-bottom: 10px;
      font-size: 32px;
      line-height: 32px;
      font-weight: 400;
      color: #55bbeb;
    }
  }
`

const Text = styled('p')`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 10px;
  font-size: 18px;
  text-transform: capitalize;

  span {
    ::after {
      content: ' ';
    }
  }

  + p {
    ::before {
      content: '-';
      margin-right: 10px;
    }
  }
`

function BestUsers (props) {
  const arrCouple = []

  props.users.reduce((acc, cur, i, arr) => {
    for (let item = i; item < arr.length; item++) {
      if (cur.id === arr[item].id) continue

      const x = Math.pow((Math.max(cur.coords.x, arr[item].coords.x) - Math.min(cur.coords.x, arr[item].coords.x)), 2)
      const y = Math.pow((Math.max(cur.coords.y, arr[item].coords.y) - Math.min(cur.coords.y, arr[item].coords.y)), 2)
      const dist = Math.sqrt((x + y))

      arrCouple.push({
        dist,
        couple: [cur, arr[item]]
      })
    }
  }, [])

  arrCouple.sort((a, b) => (a.dist > b.dist) ? 1 : -1).splice(5, arrCouple.length)

  const elements = arrCouple.reduce((acc, cur) => {
    const er = cur.couple.map(item => {
      return (
        <Text key={item.id}>
          <span>{item.name}</span>
          {item.surname}
        </Text>)
    })

    return [...acc, (
      <li key={(Math.round(cur.dist) + Math.random())}>{er}</li>
    )]
  }, [])

  return (
    <Ul>
      {elements}
    </Ul>
  )
}

BestUsers.propTypes = {
  users: PropTypes.array.isRequired
}

export default BestUsers
