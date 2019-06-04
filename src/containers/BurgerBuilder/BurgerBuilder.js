import React, { Fragment, Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get(`https://burgerbuilderreact-9ae33.firebaseio.com/ingredients.json`)
      .then(res => {
        this.setState({ ingredients: res.data })
      })
      .catch(err => {
        this.setState({error: true})
      })
  }


  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 }) // Switches purchasable depending on the valuees of the ingredients
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]; // SALAD is now going to be 1
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]; // SALAD is now going to be 1
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDedduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDedduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
  /*  
      */
     const queryParams = [];

     for (let i in this.state.ingredients) {
       queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
   
     }

     queryParams.push('price= ' + this.state.totalPrice);

     const queryString = queryParams.join('&');
       this.props.history.push(({
       pathname: '/checkout',
       search: '?' + queryString
     }))
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant be loaded</p>: <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          (<Burger ingredients={this.state.ingredients} />

          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler} />

            
      </Fragment>
      )
       orderSummary = <OrderSummary
       ingredients={this.state.ingredients}
       purchaseCancelled={this.purchaseCancelHandler}
       purchaseContinued={this.purchaseContinueHandler}
       price={this.state.totalPrice.toFixed(2)}
     />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }


    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Fragment>
    )
  }
}



export default withErrorHandler(BurgerBuilder, axios);