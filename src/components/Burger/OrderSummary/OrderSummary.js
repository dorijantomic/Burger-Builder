
import React, { Fragment, Component } from 'react'
import Button from '../../UI/Button/Button'

export class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[OrderSummary.js] will update ')
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map((igKey, i) => {
                return (
                    <li key={igKey + i}>
                        <span stype={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            })

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkpout ? </p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary
