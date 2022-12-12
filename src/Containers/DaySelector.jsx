import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { chartDays } from '../Config/data'

const DaySelector = ({clicked, buttonSelected}) => {

    const style = "border border-gold text-white hover:bg-gold hover:text-backCol font-bold uppercase px-8 py-3 max-sm:px-3 max-sm:py-1 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";

    const selectedStyle = "border border-gold bg-gold text-backCol font-bold uppercase px-8 py-3 max-sm:px-3 max-sm:py-1 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";

    return (
        <Stack spacing={2} direction="row">
            {
                chartDays.map((day) => (
                    <button className={buttonSelected===day.value ? selectedStyle : style} type="button"
                    onClick={() => {clicked(day.value)}}
                    >
                        {day.label}
                    </button>
                ))
            }
        </Stack>
    )
}

export default DaySelector