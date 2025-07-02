// This is a simple simulation of a backend order processor
// In a real implementation, this would be replaced with server-side code

// Function to handle order submission
function processOrder(orderData) {
    return new Promise((resolve, reject) => {
        // Simulate server processing time
        setTimeout(() => {
            try {
                // In a real implementation, this would send the order to a database or email
                console.log('Processing order:', orderData);

                // For demo purposes, we'll store the order in localStorage
                const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
                orders.push({
                    ...orderData,
                    orderId: generateOrderId(),
                    status: 'received',
                    receivedAt: new Date().toISOString()
                });
                localStorage.setItem('restaurantOrders', JSON.stringify(orders));

                // Simulate sending email to restaurant owner
                sendOrderEmail(orderData);

                resolve({
                    success: true,
                    message: 'Order received successfully',
                    orderId: orders[orders.length - 1].orderId
                });
            } catch (error) {
                reject({
                    success: false,
                    message: 'Failed to process order',
                    error: error.message
                });
            }
        }, 1500); // Simulate 1.5 second processing time
    });
}

// Generate a unique order ID
function generateOrderId() {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + 
           Math.random().toString(36).substring(2, 5).toUpperCase();
}

// Simulate sending an email to the restaurant owner
function sendOrderEmail(orderData) {
    // In a real implementation, this would use a server-side email service
    console.log('Sending order email to restaurant owner');
    console.log('Order details:', orderData);

    // Email content would be formatted here
    const emailContent = `
        New Order Received!

        Order ID: ${generateOrderId()}
        Table: ${orderData.tableNumber}
        Total: €${orderData.total.toFixed(2)}

        Items:
        ${orderData.items.map(item => `- ${item.name} x${item.quantity} (€${(item.price * item.quantity).toFixed(2)})`).join('\n')}

        Order received at: ${new Date().toLocaleString()}
    `;

    console.log('Email content:', emailContent);

    // In a real implementation, this would be sent via an email API
    return true;
}

// Export functions for use in cart.js
// In a real implementation, these would be API endpoints
window.orderProcessor = {
    processOrder,
    getOrders: () => JSON.parse(localStorage.getItem('restaurantOrders') || '[]')
};
