import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LookMarkThingForm from '../../components/Looks/LookMarkThingForm';
import { saveThing, removeThing, moduleName } from '../../../ducks/publish';

const mapStateToProps = (state, ownProps) => {
  const thing = state[moduleName].things.get(ownProps.thingId);

  if (!thing) return null;

  return {
    thingId: ownProps.thingId,
    initialValues: {
      name: thing.name || null,
      brand: thing.brand || null,
      price: thing.price || null,
    },
  };
};

const mapDispatchToProps = {
  saveThing,
  removeThing,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'markItems',
})(LookMarkThingForm));
