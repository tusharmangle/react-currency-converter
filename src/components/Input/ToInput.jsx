import React from 'react'

const FromInput = ({currencies,setToHandler, to}) => {

    if(currencies.length === 0){
        return "Loading....."
    }
    return (
            <form className="px-5" action="">
                <select className="w-full border px-5 py-3 font-semibold text-gray-700 rounded-lg focus:shadow-outline bg-white focus:outline-none" value={to} onChange={(e)=> setToHandler(e.target.value)} >
                    <option value="USD">United States Dollar</option>
                    {currencies.map(currency =><option value={currency.id}  key={currency.id}>{currency.currencyName}</option>)}
                </select>
            </form>
    )
}

export default FromInput
