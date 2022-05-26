import { saveShippingAdress } from '../actions/cartAction'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_SHIPPING_ADDRESS_RESET, CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems:[], shippingAdress: {}}, action) => {
    switch(action.type){

        case CART_ADD_ITEM:
            const item = action.payload
            //buscar si el item existe para no anadirlo de nuevo sino actulizar a la nueva cantidad
            const existItem = state.cartItems.find(x => x.product === item.product)
            //si el producto ya existe
            if (existItem){
                return{
                    ...state,
                    // x = a cada index del array
                    // buscar en el carrito(array) comparando cada producto(x.product) con el producto a anadir(existing item)
                    // y reemplezarlo con por el nuevo producto(item)
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }
            // si no existe devolvemos el array como esta mas el el item nuevo
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
            
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems:state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems:[]
            }

        default:
            return state
    }

}