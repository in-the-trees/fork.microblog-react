import * as React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import Auth from './../../stores/Auth';
import LoginMessage from './../../components/info/login_message';
import WebViewModule from '../../components/web/webview_module';
import ImageModalModule from '../../components/images/image_modal';

@observer
export default class TimelineScreen extends React.Component{

  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          Auth.is_logged_in() && !Auth.is_selecting_user ?
          <WebViewModule endpoint="hybrid/posts" component_id={this.props.componentId} />
          :
          <LoginMessage title="Timeline" />
        }
        <ImageModalModule />
      </View>
    )
  }

}
