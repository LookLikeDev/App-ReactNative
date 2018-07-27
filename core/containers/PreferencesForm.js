import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PreferencesForm from '../components/PreferencesForm';
import { moduleName as userModule, updateUserInfo } from '../../ducks/user';

const mapStateToProps = state => ({
  userId: state[userModule].id,
});

const mapDispatchToProps = {
  updateUserInfo,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'preferences',
  initialValues: {
    publishAnonymous: false,
  },
})(PreferencesForm));
