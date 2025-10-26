import type { Guitart } from '../types/type';
import  type { CartACtions } from '../reducers/cart-reducers';

type GuitarProps = {
    guitar: Guitart;
    dispatch :  React.Dispatch<CartACtions>
}

function Guitar(props: GuitarProps) {
    // destructuring de props y guitar en la clave como se envia desde App.jsx
    const {guitar, dispatch } = props; // Destructurar del objeto props
    
    // Destructurar del objeto guitar
    const {name, image, description, price } = guitar;
 
//     let hh : Guitart = {
//     "id": 12,
//     "name": "Hazel",
//     "image": "guitarra_12",
//     "description": "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.",
//     "price": 379
// }
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={()=>dispatch({type:'add-to-cart', payload:{item: guitar}})}
                    >Agregar al Carrito</button>
                </div>
        </div>
    )
};


export default Guitar;