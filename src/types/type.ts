// types definitions
export type Guitart = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

// CartItem hereda o extiende de Guitar y agrega un nuevo atribuo
export type CartItem = Guitart & {
    quantity: number
};