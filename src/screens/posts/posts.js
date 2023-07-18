import * as React from 'react';
import { observer } from 'mobx-react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Auth from './../../stores/Auth';
import LoginMessage from '../../components/info/login_message'
import App from '../../stores/App'
import { Navigation } from 'react-native-navigation';
import PostCell from '../../components/cells/post_cell';
import { postsDestinationBottomSheet } from '..'
import { SheetProvider } from "react-native-actions-sheet";
import SearchIcon from '../../assets/icons/nav/discover.png';
import { SFSymbol } from "react-native-sfsymbols";

@observer
export default class PostsScreen extends React.Component{
  
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
  }
  
  componentDidAppear(){
    Auth.selected_user.posting?.selected_service?.upate_posts_for_active_destination()
  }
  
  _return_header = () => {
    const { config } = Auth.selected_user.posting.selected_service
    return(
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          width: '100%',
          backgroundColor: App.theme_input_background_color(),
        }}>
        <TouchableOpacity onPress={() => postsDestinationBottomSheet(false, "posts")}>
          <Text style={{color: App.theme_text_color(), fontWeight: "500", fontSize: 16}}>
            {config.posts_destination()?.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderColor: App.theme_border_color(),
            borderWidth: 2,
            padding: 4,
            paddingHorizontal: 6,
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={App.toggle_post_search_is_open}
        >
        {
          Platform.OS === "ios" ?
          <SFSymbol
            name={"magnifyingglass"}
            color={App.theme_button_text_color()}
            style={{ height: 18, width: 18 }}
          />
          :
          <Image source={SearchIcon} style={{ height: 22, width: 22, tintColor: App.theme_button_text_color() }} />
        }
        </TouchableOpacity>
      </View>
    )
  }
  
  _key_extractor = (item) => item.uid;
  
  render_post_item = ({ item }) => {
    return(
      <PostCell key={item.uid} post={item} />
    )
  }
  
  _return_posts_list = () => {
    const { selected_service } = Auth.selected_user.posting
    const { config } = selected_service
    return(
      <FlatList
        data={config.posts_for_destination()}
        extraData={config.posts_for_destination()?.length && !selected_service.is_loading_posts}
        keyExtractor={this._key_extractor}
        renderItem={this.render_post_item}
        style={{
          backgroundColor: App.theme_background_color_secondary(),
          width: "100%"
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => selected_service.check_for_posts_for_destination(config.posts_destination())}
          />
        }
      />
    )
  }
  
  render() {
    return (
      <SheetProvider>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {
            Auth.is_logged_in() && !Auth.is_selecting_user ?
              <>
              {this._return_header()}
              {this._return_posts_list()}
              </>
            :
            <LoginMessage title="Posts" />
          }
        </View>
      </SheetProvider>
    )
  }
  
}