import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LookMarkItemsForm from '../../components/Looks/LookMarkItemsForm';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return null;
};

/*const mapDispatchToProps = {
  uploadImage,
};*/

// TODO create selectors for entities
export default connect()(reduxForm({
  form: 'markItems',
  initialValues: {
    shopName: null,
    publishAnonymous: false,
  },
}, mapStateToProps)(LookMarkItemsForm));
