import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button';
import { useContext } from 'react';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/UserProgressContext';
export default function Header(){

    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
        return totalNumberOfItems + item.quantity;
    },0);

    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="food logo" />
                <h1>
                    ReactFood
                </h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}