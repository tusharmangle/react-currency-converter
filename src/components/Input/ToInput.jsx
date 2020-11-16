import React from 'react'
import Select from 'react-select';

const FromInput = ({currencies,setToHandler, to}) => {

    if(currencies.length === 0){
        return ""
    }
    return (
            <form className="px-5" action="">
                <Select
                className="font-semibold text-gray-600"
                    value={to}
                    onChange={setToHandler}
                    options={currencies}
                />
            </form>
    )
}

export default FromInput
