document.addEventListener('DOMContentLoaded', function() {
    const ordersList = document.getElementById('orders-list');

    async function fetchOrders() {
        const query = `
            query {
                orders {
                    id
                    itemName
                    status
                }
            }
        `;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        const result = await response.json();
        return result.data.orders;
    }

    async function updateOrderStatus(id, status) {
        const mutation = `
            mutation {
                updateOrderStatus(id: "${id}", status: "${status}") {
                    id
                    status
                }
            }
        `;
        await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mutation })
        });
    }

    function createOrderCard(order) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${order.itemName}</h5>
                    <p class="card-text">Status: <span class="order-status">${order.status}</span></p>
                    <button class="btn btn-success update-status-btn" data-id="${order.id}" data-status="Out for Delivery">Out for Delivery</button>
                    <button class="btn btn-primary update-status-btn" data-id="${order.id}" data-status="Delivered">Delivered</button>
                </div>
            </div>
        `;
        card.querySelectorAll('.update-status-btn').forEach(button => {
            button.addEventListener('click', async function() {
                const id = this.getAttribute('data-id');
                const status = this.getAttribute('data-status');
                await updateOrderStatus(id, status);
                card.querySelector('.order-status').innerText = status;
            });
        });
        return card;
    }

    async function populateOrders() {
        const orders = await fetchOrders();
        orders.forEach(order => {
            const orderCard = createOrderCard(order);
            ordersList.appendChild(orderCard);
        });
    }

    populateOrders();
});