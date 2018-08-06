import { connect } from 'react-redux';
import {
  moduleName, addImage, addThing, removeThing,
} from '../../../ducks/publish';
import PublishCamera from '../../components/Publish/PublishCamera';

const mapStateToProps = state => ({
  image: state[moduleName].image,
  things: state[moduleName].things.toArray(),
});

const mapDispatchToProps = {
  addImage,
  addThing,
  removeThing,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(PublishCamera);
