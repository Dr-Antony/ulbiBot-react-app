import React from "react";
import './ProductList.css';
import ProductItem from "./ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useState,useCallback,useEffect } from "react";
const products = [
    { id: '1', title: 'Jeans', description: 'Blue jeans for gey', price: 1000 },
    { id: '2', title: 'Shirt', description: 'For natural', price: 3000 },
    { id: '3', title: 'T-shirt', description: 'For girl', price: 1500 },
    { id: '4', title: 'StickYorFinger', description: 'For mimi-penis', price: 5000 }
]
const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
};

const ProductList = (props) => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems)
        }
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [])
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, []);



    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }
        setAddedItems(newItems);
        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem product={item}
                    onAdd={onAdd}
                    className={'item'} />
            ))}
        </div>
    )
};

export default ProductList;