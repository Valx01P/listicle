  const createElementWithText = (tag, text) => {
    const element = document.createElement(tag)
    element.textContent = text
    return element
  }
  
  const renderStocks = async () => {
    try {
      const response = await fetch('/stocks')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const stockData = await response.json()
      
      const stocksContainer = document.getElementById('stocks')
      stocksContainer.innerHTML = '' // Clear any existing content
      
      stockData.forEach(stock => {
        const stockCard = document.createElement('a')
        stockCard.classList.add('stock-card')
        stockCard.href = `/stocks/${stock.ticker}`
        
        const stockInfo = document.createElement('div')
        stockInfo.classList.add('stock-info')
        
        stockInfo.appendChild(createElementWithText('h2', stock.ticker))
        stockInfo.appendChild(createElementWithText('p', stock.name))
        stockInfo.appendChild(createElementWithText('p', `Price: $${stock.stockPrice}`))
        stockInfo.appendChild(createElementWithText('p', `Earnings: $${stock.earnings}`))
        
        const stockImage = document.createElement('div')
        stockImage.classList.add('stock-image')
        
        const img = document.createElement('img')
        img.src = `/logos/${stock.imageName}`
        img.alt = `${stock.name} logo`
        stockImage.appendChild(img)
        img.style.width = '90px'
        img.style.height = '75px'
        
        stockCard.appendChild(stockInfo)
        stockCard.appendChild(stockImage)
        
        stocksContainer.appendChild(stockCard)
      })
      
    } catch (error) {
      console.error('Error fetching stock data:', error)
      const errorMessage = createElementWithText('p', `Failed to load stock data. Please try again later. Error: ${error.message}`)
      document.getElementById('stocks').appendChild(errorMessage)
    }
  }
    
// Function to determine if the current page is the main page
const isMainPage = () => {
    const pathname = window.location.pathname
    return pathname === '/' || pathname === '/index.html'
}

// Function to determine if the URL is for a specific stock
const isStockPage = () => {
    const pathname = window.location.pathname
    const ticker = pathname.split('/').pop()
    return !ticker && pathname.includes('/stocks/')
}

// Redirect to 404 if the URL is invalid
const handleInvalidUrl = () => {
    if (!isMainPage() && !isStockPage()) {
        window.location.href = '../404.html'
    } else if (isMainPage()) {
        renderStocks()
    }
}

// Call the function to handle the current URL
handleInvalidUrl()
