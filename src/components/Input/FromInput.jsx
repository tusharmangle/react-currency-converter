import React from 'react'

const FromInput = ({currencies,setFromHandler, from}) => {

    if(currencies.length === 0){
        return
    }
    return (
            <form className="px-5">
                <select className=" w-full border px-5 py-3 font-semibold text-gray-700 rounded-lg focus:shadow-outline bg-white focus:outline-none" value={from} onChange={(e)=> setFromHandler(e.target.value)} >
                    <option value="INR">Indian Rupee</option>
                    {currencies.map(currency =><option value={currency.id}  key={currency.id}>{currency.currencyName}</option>)}
                </select>
            </form>
            
    )
}

export default FromInput
