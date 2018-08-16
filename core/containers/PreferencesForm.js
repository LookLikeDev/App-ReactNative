import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PreferencesForm from '../components/PreferencesForm';
import { moduleName as userModule, updateUserInfo } from '../../ducks/user';

const mapStateToProps = (state) => {
  const birthday = state[userModule].getIn(['user', 'birthday']);

  return {
    userId: state[userModule].id,
    initialValues: {
      name: state[userModule].getIn(['user', 'name']),
      birthday: birthday ? birthday.toDate() : null,
      is_female: state[userModule].getIn(['user', 'is_female']),
      publishAnonymous: false,
    },
  };
};

const mapDispatchToProps = {
  updateUserInfo,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'preferences',
})(PreferencesForm));
