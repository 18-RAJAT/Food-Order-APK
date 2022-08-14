import {useReducer} from 'react';

import React from 'react';
import CartContext from './cart-context';

const defaultCartState={
    items:[],
    totalAmount:0
};

const cartReducer = (state, action) => {
  //state is the current state of the cart, action is the action that is being dispatched
  if(action.type === 'ADD'){
        const updatedIems=state.items.concat(action.item);
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        return{
            items:updatedIems,
            totalAmount:updatedTotalAmount
        };
  }
    return defaultCartState;
}; 

const CartProvider = (props) => {
   const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type:'ADD', item:item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE', id:id});
    };

    const cartContext = {
        items: cartState.items,//[],
        totalAmount: cartState.totalAmount,//0,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    
    return (
        <CartContext.Provider value={cartContext}>
          {props.children}
        </CartContext.Provider>
      );
};

export default CartProvider;