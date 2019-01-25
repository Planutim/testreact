import React from 'react'
import {shallow} from 'enzyme'
import App from './App'

it('renders',()=>{
  shallow(<App/>)
})
//Не писал тесты для REACT, только функциональные при помощи chai