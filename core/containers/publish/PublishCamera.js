import { connect } from 'react-redux';
import {
  moduleName, addThing, updateThing, removeThing,
} from '../../../ducks/publish';
import PublishCamera from '../../components/Publish/PublishCamera';

const mapStateToProps = state => ({
  image: state[moduleName].image,
  things: state[moduleName].things.toArray(),
});

const mapDispatchToProps = {
  addThing,
  updateThing,
  removeThing,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(PublishCamera);
