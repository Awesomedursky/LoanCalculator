
document.querySelector('.form').addEventListener('submit', function (e) {
    // hide results always
    document.querySelector('.results').style.display = 'none'


    // show loader
    document.querySelector('#loading').style.display = 'block'

    // display results after loader runs for 3 seconds
    setTimeout(calculateLoan, 1000)

    e.preventDefault()
})

// calculations results
function calculateLoan(e) {
    
    // get elements from DOM
    const  amount = document.querySelector('#amount')
    const  interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')


    // calculating formulaes
    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12

    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)
    
    // checking if result is finite
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

        // hide loader 
        document.querySelector('#loading').style.display = 'none'

        //show results
        document.querySelector('.results').style.display = 'block'
    }

    // if result is not available, show error message
    else {
        showError('Please Check your number')
    }

    
}


// error message function
function showError(w) {
    // hide loader 
    document.querySelector('#loading').style.display = 'none'

    // hide results
    document.querySelector('.results').style.display = 'none'

    const row = document.querySelector('.row')
    const heading = document.querySelector('h1')
    const i = document.createElement('div')
    i.className = 'danger'
    i.appendChild(document.createTextNode(w))
    row.insertBefore(i, heading)
    
    setTimeout(function () {
        i.remove()
    }, 2000)

}