import PropTypes from 'prop-types';
import { Helmet } from "react-helmet-async";

const DynamicTitle = ({title}) => {
  return (
    <Helmet>
        <title>Bistro Boss | {title}</title>
    </Helmet>
  )
}

DynamicTitle.propTypes = {
    title:PropTypes.string.isRequired
}

export default DynamicTitle