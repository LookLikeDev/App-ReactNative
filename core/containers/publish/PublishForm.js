import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PublishForm from '../../components/Publish/PublishForm';
import { moduleName as userModule, setUserInfo } from '../../../ducks/user';
import { moduleName as publishModule, saveLook } from '../../../ducks/publish';
import { moduleName as discountsModule } from '../../../ducks/shops';

const mapStateToProps = (state, { shop }) => {
  const birthday = state[userModule].getIn(['user', 'birthday']);

  return {
    userId: state[userModule].id,
    image: state[publishModule].image,
    uploading: state[publishModule].uploading,
    uploaded: state[publishModule].uploaded,
    discount: state[discountsModule].getIn(['entities', shop.id, 'discount']),
    initialValues: {
      name: state[userModule].getIn(['user', 'name']),
      birthday: birthday ? birthday.toDate() : null,
      publishAnonymous: false,
    },
  };
};

const mapDispatchToProps = {
  saveLook,
  setUserInfo,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'publishLook',
})(PublishForm));
