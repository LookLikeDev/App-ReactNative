import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LookPublishForm from '../components/Looks/LookPublishForm';
import { moduleName as userModule } from '../../ducks/user';
import { uploadImage, moduleName as looksModule } from '../../ducks/looks';

const mapStateToProps = state => ({
  userId: state[userModule].id,
  image: state[looksModule].image,
  uploading: state[looksModule].uploading,
  uploaded: state[looksModule].uploaded,
});

const mapDispatchToProps = {
  uploadImage,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'publishLook',
  initialValues: {
    shopName: null,
    publishAnonymous: false,
  },
})(LookPublishForm));
