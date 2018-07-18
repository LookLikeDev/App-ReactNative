import React from 'react';
import { connect } from 'react-redux';
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';
import MainScreen from './screens/MainScreen';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" showLabel={false} tabs>
          <Scene key="main" component={MainScreen} title="Заголовок" hideNavBar />
        </Stack>
      </Router>
    );
  }
}

export default connect()(Root);
