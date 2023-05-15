import React, { useState, useEffect } from 'react';
import OrderCard from '../OrderCard';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching orders');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async (orderId) => {
        // Обработка отклонения заказа
        console.log('Decline order:', orderId);
        fetchOrders(); // Обновите список заказов после отклонения
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching orders');
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, []);

    const handleApprove = async (orderId) => {
        // Обработка одобрения заказа
        console.log('Approve order:', orderId);
    };

    return (
        <main className="main">
            {orders.map((order) => (
                <OrderCard
                    key={order._id}
                    order={order}
                    onApprove={handleApprove}
                    onDecline={handleDecline}
                />
            ))}
        </main>
    );
}

export default Orders;
