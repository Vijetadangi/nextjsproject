'use client'
import { useEffect, useState } from "react"
import CustomerHeader from "@/app/_components/CustomerHeader"
import Footer from "@/app/_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"



const Page = () => {
    const [userStorage, setUserStorage] = useState({ name: '', address: '', mobile: '' });
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) setUserStorage(JSON.parse(user));

        const cart = localStorage.getItem('cart');
        if (cart) {
            const parsedCart = JSON.parse(cart);
            setCartStorage(parsedCart);
            if (parsedCart.length > 0) {
                const calculatedTotal = parsedCart.length === 1 
                    ? parsedCart[0].price 
                    : parsedCart.reduce((a, b) => (typeof a === 'number' ? a : a.price) + b.price);
                setTotal(calculatedTotal);
            }
        }
    }, []);

    const [removeCartData, setRemoveCartData] = useState(false)
    const router = useRouter()


    useEffect(() => {
        if (!total) {
            router.push('/')
        }
    }, [total])

    const orderNow = async () => {
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;

        let cart = JSON.parse(localStorage.getItem('cart'));
        let foodItemIds = cart.map((item) => item._id).toString();
        let deliveryBoyResponse = await fetch('/api/deliverypartners/' + city);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);

        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]
        console.log(deliveryBoy_id);
        if (!deliveryBoy_id) {
            alert("delivery partner not available ")
            return false;
        }



        let resto_id = cart[0].resto_id;
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status: 'confirm',
            amount: total + DELIVERY_CHARGES + (total * TAX / 100),
        }

        let response = await fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify(collection)
        });
        response = await response.json();
        if (response.success) {
            alert("order confirmed")
            setRemoveCartData(true)
            router.push('myprofile')

        } else {
            alert("order failed")
        }
        console.log(collection);
    }
    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className="row">
                        <span>address </span>
                        <span>{userStorage.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile </span>
                        <span>{userStorage.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges  : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash on Delivery : </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>

                </div>
                <div className="block-2">
                    <button onClick={orderNow} >Place your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page