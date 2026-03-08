"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [user, setUser] = useState(null);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    const router = useRouter();

    // Load localStorage data safely (browser only)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedCart = localStorage.getItem("cart");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedCart) {
            const cartArr = JSON.parse(storedCart);
            setCartItem(cartArr);
            setCartNumber(cartArr.length);
        }
    }, []);

    // Handle adding cart items
    useEffect(() => {
        if (props.cartData) {
            if (cartItem.length > 0) {
                if (cartItem[0].resto_id !== props.cartData.resto_id) {
                    localStorage.setItem("cart", JSON.stringify([props.cartData]));
                    setCartItem([props.cartData]);
                    setCartNumber(1);
                } else {
                    const updated = [...cartItem, props.cartData];
                    setCartItem(updated);
                    setCartNumber(updated.length);
                    localStorage.setItem("cart", JSON.stringify(updated));
                }
            } else {
                setCartItem([props.cartData]);
                setCartNumber(1);
                localStorage.setItem("cart", JSON.stringify([props.cartData]));
            }
        }
    }, [props.cartData]);

    // Handle removing single cart item
    useEffect(() => {
        if (props.removeCartData) {
            const updated = cartItem.filter((item) => item._id !== props.removeCartData);
            setCartItem(updated);
            setCartNumber(updated.length);

            if (updated.length > 0) {
                localStorage.setItem("cart", JSON.stringify(updated));
            } else {
                localStorage.removeItem("cart");
            }
        }
    }, [props.removeCartData]);

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/user-auth");
    };

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
                />
            </div>

            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

                {user ? (
                    <>
                        <li>
                            <Link href="/myprofile">{user.name}</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/user-auth">Login</Link>
                        </li>
                        <li>
                            <Link href="/user-auth">SignUp</Link>
                        </li>
                    </>
                )}

                <li>
                    <Link href={cartNumber > 0 ? "/cart" : "#"}>
                        Cart({cartNumber})
                    </Link>
                </li>

                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>

                <li>
                    <Link href="/deliverypartner">Delivery Partner</Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerHeader;
