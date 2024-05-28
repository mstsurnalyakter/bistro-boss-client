import React from 'react'
import PropTypes from 'prop-types'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const Payment = () => {
  return (
    <div>
        <SectionTitle heading='Payment' subHeading='Please pay to eat' />
        <div>
            <h2 className='text-4xl'>Taka o pakhi tumi uira uira aso</h2>
        </div>
    </div>
  )
}

Payment.propTypes = {}

export default Payment