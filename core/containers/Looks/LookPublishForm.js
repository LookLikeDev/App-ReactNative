import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LookPublishForm from '../../components/Looks/LookPublishForm';
import { moduleName as userModule } from '../../../ducks/user';
import { saveLook, moduleName as publishModule } from '../../../ducks/publish';

const mapStateToProps = state => ({
  userId: state[userModule].id,
  image: state[publishModule].image,
  uploading: state[publishModule].uploading,
  uploaded: state[publishModule].uploaded,
});

const mapDispatchToProps = {
  saveLook,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'publishLook',
  initialValues: {
    shopName: null,
    publishAnonymous: false,
  },
})(LookPublishForm));
