import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  router: state.router,
});

export default connect(mapStateToProps)(Header);
