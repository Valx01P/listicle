const renderStock = async () => {
    try {
        // Parse the stock ticker from the URL
        const pathSegments = window.location.pathname.split('/')
        const requestedTicker = pathSegments[pathSegments.length - 1].toUpperCase()

        // Fetch all stock data
        const response = await fetch('/stocks')
        if (!response.ok) {
            throw new Error('Failed to fetch stock data')
        }
        const data = await response.json()

        // Find the stock that matches the requested ticker
        const stock = data.find(stock => stock.ticker === requestedTicker)

        if (stock) {
            // Set the stock details in the DOM
            document.querySelector('.stock-ticker').textContent = stock.ticker
            document.querySelector('.stock-name').textContent = stock.name
            document.querySelector('.stock-price').textContent = `Price: $${stock.stockPrice}`
            document.querySelector('.stock-marketcap').textContent = `Market Cap: $${stock.marketCap.toLocaleString()}`
            document.querySelector('.stock-earnings').textContent = `Earnings: $${stock.earnings}`
            document.querySelector('.stock-employees').textContent = `Employees: ${stock.employees.toLocaleString()}`
            document.querySelector('.stock-assets').textContent = `Assets: $${stock.assets.toLocaleString()}`
            document.querySelector('.stock-debt').textContent = `Debt: $${stock.debt.toLocaleString()}`
            document.querySelector('.stock-free-capital').textContent = `Free Capital: $${stock.freeCapital.toLocaleString()}`
            document.querySelector('.stock-pe-ratio').textContent = `PE Ratio: ${stock.peRatio}`

            const stockLogo = document.querySelector('.stock-logo')
            stockLogo.src = `/logos/${stock.imageName}`
            stockLogo.alt = `${stock.name} logo`

            // Set the page title to the stock name
            document.title = stock.name
        } else {
            throw new Error('Stock not found')
        }
    } catch (error) {
        console.error('Error rendering stock details:', error)
        // Redirect to 404 page if there's an error
        window.location.href = '/404.html'
    }
}

// Call the renderStock function to display the stock details
renderStock()
