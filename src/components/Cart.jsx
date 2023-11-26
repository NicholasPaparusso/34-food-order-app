import { useContext } from "react";
import CartContext from "../store/cartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import Modal from "../UI/Modal"
import CartItem from "./CartItem";
import UserProgressContext from "../store/UserProgressContext";
export default function Cart(){
    
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price ,0)

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout(){
        userProgressCtx.showCheckout();
    }
    return(
        <Modal className="cart" open={userProgressCtx.progress ==='cart'} onClose={userProgressCtx.progress ==='cart' ? handleCloseCart : null}>
            <h2>
                Your Cart
            </h2>
            <ul>
                {cartCtx.items.map((item)=>{
                    return(
                        <CartItem item={item} key={item.id} onIncrease={()=> cartCtx.addItem(item)} onDecrease={()=> cartCtx.removeItem(item.id)}>
                            
                        </CartItem>
                    )
                })}
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(cartTotal)}
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}