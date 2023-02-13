import * as React from 'react';
import { observer } from 'mobx-react';
import { ActivityIndicator, Platform } from 'react-native';
import Replies from './../../stores/Replies';
import Auth from './../../stores/Auth';

@observer
export default class RefreshActivity extends React.Component{
  
  render() {
    const is_loading = this.props.type === "posts" ? Auth.selected_user.posting.selected_service.is_loading_posts : Replies.is_loading
    return(
      <ActivityIndicator style={{ marginRight: Platform.OS === "android" ? 8 : 0 }} color="#f80" animating={is_loading}  />
    )
  }
  
}