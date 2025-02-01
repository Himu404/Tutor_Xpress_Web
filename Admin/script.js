// Set this flag to 'true' during development to disable protection
const isDevMode = true; // Set to false once development is complete

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-sidebar");
    const sidebar = document.getElementById("admin-sidebar");
    const content = document.getElementById("admin-content");
    const loginForm = document.getElementById("admin-login-form");
    const loginSection = document.getElementById("login-authentication");
    const links = document.querySelectorAll("#admin-sidebar ul li a");
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status');


    // If not in development mode, enforce login check on page load
    if (!isDevMode) {
        const isLoggedIn = localStorage.getItem("loggedIn");

        if (!isLoggedIn) {
            // If not logged in, redirect to login page
            window.location.href = "login.html"; // Redirect to login page
        } else {
            enableLinks(); // Enable links if logged in
        }
    } else {
        enableLinks(); // Automatically enable links in dev mode
    }

    // Sidebar toggle functionality
    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        content.classList.toggle("full-width");
    });

    // Handle login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Here you can add a real authentication check (with an API or hardcoded credentials)
        if (email === "admin@example.com" && password === "password123") {
            localStorage.setItem("loggedIn", "true");
            enableLinks();
            alert("Login successful!");
            // Redirect to the dashboard or another page after successful login
            window.location.href = "admin-dashboard.html"; // Redirect to admin page
        } else {
            alert("Invalid credentials! Please try again.");
        }
    });

    // Function to enable links if user is logged in
    function enableLinks() {
        links.forEach(link => {
            link.classList.remove("protected");
            link.style.pointerEvents = "auto";
            link.style.opacity = "1"; // Revert opacity when enabled
            link.style.cursor = "pointer"; // Enable click event
        });
    }

    // Function to disable links if user is not logged in
    function disableLinks() {
        links.forEach(link => {
            if (link.classList.contains("protected")) {
                link.style.pointerEvents = "none";
                link.style.opacity = "0.6";
                link.style.cursor = "not-allowed"; // Disable click event
            }
        });
    }
});


















document.addEventListener("DOMContentLoaded", () => {
    // Get references to the search input and status filter
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status');
    
    // Example payments data (replace this with real data)
    const payments = [
        {
            userName: "John Doe",
            userId: "12345",
            amount: "$1000",
            transactionId: "TXN001",
            paymentNumber: "PN12345",
            submissionDate: "2023-01-15",
            status: "Pending"
        },
        {
            userName: "Jane Smith",
            userId: "67890",
            amount: "$1500",
            transactionId: "TXN002",
            paymentNumber: "PN67890",
            submissionDate: "2023-01-17",
            status: "Approved"
        },
        {
            userName: "Tom Brown",
            userId: "54321",
            amount: "$800",
            transactionId: "TXN003",
            paymentNumber: "PN54321",
            submissionDate: "2023-01-20",
            status: "Declined"
        }
    ];

    // Function to filter and search through payments data
    function filterAndSearch() {
        const searchQuery = searchInput.value.toLowerCase();
        const statusQuery = statusFilter.value.toLowerCase();

        // Filter payments based on search and status
        const filteredPayments = payments.filter(payment => {
            const matchesSearch = payment.userName.toLowerCase().includes(searchQuery) ||
                                  payment.userId.toLowerCase().includes(searchQuery) ||
                                  payment.transactionId.toLowerCase().includes(searchQuery);
            const matchesStatus = statusQuery ? payment.status.toLowerCase() === statusQuery : true;
            return matchesSearch && matchesStatus;
        });

        // Call function to update the table with filtered data
        populateTable(filteredPayments);
    }

    // Function to populate the table with filtered payments
    function populateTable(data) {
        const tableBody = document.querySelector("table tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        // Add rows to the table
        data.forEach(payment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment.userName}</td>
                <td>${payment.userId}</td>
                <td>${payment.amount}</td>
                <td>${payment.transactionId}</td>
                <td>${payment.paymentNumber}</td>
                <td>${payment.submissionDate}</td>
                <td>${payment.status}</td>
                <td><button>Edit</button><button>Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Event listeners for the search and status filter
    searchInput.addEventListener('input', filterAndSearch);
    statusFilter.addEventListener('change', filterAndSearch);

    // Initialize table with all data on page load
    populateTable(payments);
});
