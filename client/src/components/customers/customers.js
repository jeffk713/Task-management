import React from 'react';
import './customers.css';

class Customers extends React.Component {
  constructor(){
    super()

    this.state= {
      customers:[]
    }
  }
  
  async componentDidMount() {
    const response = await fetch('/api/customers');
    const customers = await response.json();
    this.setState({ customers }, () => console.log(this.state))
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer => 
            <li key={customer._id} >{customer.firstName} {customer.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
