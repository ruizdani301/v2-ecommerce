import {db} from '../data/db';
import type {CartItem, Guitart} from '../types/type';

// primer paso definir los tipos de acciones q va a manejar el reducer
export type CartACtions =
  {type: 'add-to-cart'; payload:{item: Guitart}}  |
  {type: 'remove-from-cart'; payload:{id: Guitart['id']}}  |
  {type: 'increase-quantity'; payload:{id: Guitart['id']}} |
  {type: 'decrease-quantity'; payload:{id: Guitart['id']}} |
  {type: 'clear-cart'};

export type CartState = {
    data: Guitart[]
    cart: CartItem[]
}  

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
};
// segundo paso definir el initial state del reducer
export const initialState : CartState = {
    data: db,
    cart: initialCart()
};

const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;
// definir el reducer con las posibilidades de acciones
export const cartReducer = (state: CartState=initialState,
                            action: CartACtions) =>{
                            console.log('action en cartReducer', action);
                            if (action.type === 'add-to-cart'){
                                
                                const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id);
                                let updatedCart: CartItem[] = [];
                                console.log('updatedCart', state.cart);
                                
                                if (itemExists) {
                                    updatedCart = state.cart.map(item => {
                                        if (item.id === action.payload.item.id ) {
                                            if (item.quantity < MAX_QUANTITY) {
                                                return { ...item,
                                                    quantity: item.quantity + 1
                                                  }}
                                            else {
                                                return item;
                                            }
                                        }
                                        else {return item};
                                        });
                                        
    
                                    }

                                else {
                                    console.log('entro aqui');
                                    const newItem: CartItem = { ...action.payload.item, quantity: 1 }; // Crear un nuevo objeto con quantity
                                    updatedCart = [...state.cart, newItem];
                                }
            
                                
                                return {...state, cart:updatedCart,
                                    
                                }}
                            
                            if (action.type === 'remove-from-cart'){
                                const cart =  state.cart.filter(item => item.id !== action.payload.id);
                                return {...state,
                                    cart
                                }
                            }
                            if (action.type === 'increase-quantity'){
                                const cart = state.cart.map(item => {
                                if (item.id === action.payload.id && item.quantity < MAX_QUANTITY) {
                                    return { ...item,
                                            quantity: item.quantity + 1
                                        };
                                }
                                return item;
                                });

                                return {...state, cart}
                            }
                            if (action.type === 'decrease-quantity'){
                                const cart = state.cart.map(item => {
                                if (item.id === action.payload.id && item.quantity > MIN_QUANTITY) {
                                    return { ...item,
                                            quantity: item.quantity - 1
                                        };
                                }
                                return item;
                                });

                            
                                return {...state, cart}
                            }
                            if (action.type === 'clear-cart'){
                                return {...state, cart: []}
                            }
                            return state;
                        }
                    