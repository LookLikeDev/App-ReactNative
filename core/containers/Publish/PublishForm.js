import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PublishForm from '../../components/Publish/PublishForm';
import { moduleName as userModule } from '../../../ducks/user';
import { saveLook, moduleName as publishModule } from '../../../ducks/publish';
import { moduleName as discountsModule } from '../../../ducks/shops';

const mapStateToProps = (state, { shop }) => ({
  userId: state[userModule].id,
  image: state[publishModule].image,
  uploading: state[publishModule].uploading,
  uploaded: state[publishModule].uploaded,
  discount: state[discountsModule].getIn(['entities', shop.id, 'discount']),
});

const mapDispatchToProps = {
  saveLook,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'publishLook',
  initialValues: {
    publishAnonymous: false,
  },
})(PublishForm));
