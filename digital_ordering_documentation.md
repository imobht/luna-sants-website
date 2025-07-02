# Digital Ordering System Documentation

## Overview

This documentation covers the implementation of a digital ordering system for your restaurant website. The system allows customers to:

1. Add menu items to a cart
2. View and modify their cart
3. Submit orders with their table number
4. Receive order confirmation

Restaurant staff can:
1. Generate QR codes for tables
2. View and manage incoming orders

## Files and Structure

### New Files

- **cart.js**: Contains all cart functionality including adding/removing items, updating quantities, and order submission
- **cart.css**: Styling for the cart interface
- **order_processor.js**: Simulates backend order processing (in a production environment, this would be replaced with server-side code)
- **qr_generator.html**: Tool for generating QR codes for each table
- **admin_dashboard.html**: Simple dashboard for restaurant staff to view and manage orders

### Modified Files

- **menu.html**: Updated to include cart functionality and "Add to Cart" buttons for each menu item
- **menu.js**: Updated to detect table numbers from URL parameters

## Setup Instructions

1. Replace your existing menu.html with the updated version
2. Add the new files to your website directory
3. Generate QR codes using qr_generator.html
4. Print and place QR codes on each table

## QR Code Generation

1. Open qr_generator.html in a web browser
2. Enter your restaurant's website URL (where menu.html is located)
3. Specify the number of tables in your restaurant
4. Click "Generate QR Codes"
5. Download and print the QR codes for each table

## Order Management

1. Open admin_dashboard.html to view incoming orders
2. Orders are displayed with table numbers, items, and total prices
3. Update order status (Preparing, Ready, Delivered) as needed

## Technical Implementation

### Cart Functionality

The cart system uses localStorage to persist cart data between page refreshes. Key functions include:

- `addToCart(name, price)`: Adds an item to the cart
- `removeFromCart(index)`: Removes an item from the cart
- `updateQuantity(index, newQuantity)`: Updates the quantity of an item
- `submitOrder()`: Processes the order submission

### Table Identification

Table numbers are included in the URL as a query parameter (e.g., menu.html?table=5). The system reads this parameter and includes it with the order.

### Order Processing

In this implementation, orders are stored in localStorage for demonstration purposes. In a production environment, you would replace this with:

1. A server-side API endpoint to receive orders
2. Database storage for orders
3. Email notifications to restaurant staff
4. Integration with a kitchen display system

## Customization Options

### Styling

The cart styling can be customized by modifying cart.css. The design follows your existing color scheme and styling patterns.

### Backend Integration

To integrate with a real backend:

1. Replace the simulated order processing in order_processor.js with API calls to your backend
2. Implement server-side code to store orders in a database
3. Set up email notifications for new orders

## Troubleshooting

### Common Issues

- **Cart not showing**: Ensure cart.js and cart.css are properly linked in menu.html
- **QR codes not working**: Verify the URL in the QR codes points to your actual menu.html location
- **Orders not appearing in dashboard**: Check that localStorage is working in your browser

### Browser Compatibility

The system has been designed to work with modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

Potential improvements for future versions:

1. Real-time order updates using WebSockets
2. Customer order tracking page
3. Integration with payment processing
4. Kitchen display system
5. Order history and analytics
