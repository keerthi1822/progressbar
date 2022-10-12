import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as ReactDOM from 'react-dom';

describe('App render tests', () => {
  let container:HTMLDivElement

  beforeEach(()=>{
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<App/>,container)
  })
  afterEach(()=>{
    document.body.removeChild(container);
    container.remove();
  })
  it('renders inputs', () => {
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(4)
   });

})


test('renders labels of the form', () => {

  const{ getByText} = render(<App/>)
const portOfLoadingLabel = getByText(/Please enter port name and time of departure./i)
const portOfDischargeLabel = getByText(/Please enter port name and time of Arrival./i)
expect(portOfLoadingLabel).toBeInTheDocument()
expect(portOfDischargeLabel).toBeInTheDocument()

});

test('render port names', () => {

const component = render(<App/>);
const port1 = component.getByTestId("renderPort1")
expect(port1.innerText).toBeTruthy

const port2 = component.getByTestId("renderPort2")
expect(port2.innerText).toBeTruthy

});











