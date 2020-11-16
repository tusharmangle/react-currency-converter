import React from 'react'
import Select from 'react-select';

const FromInput = ({currencies,setFromHandler, from}) => {

    if(currencies.length === 0){
        return ""
    }
    return (
            <form className="px-5">
                <Select
                className="font-semibold text-gray-600"
                    value={from}
                    onChange={setFromHandler}
                    options={currencies}
                />
            </form>
    )
}

export default FromInput
