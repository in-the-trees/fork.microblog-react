import * as React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Reply from '../../stores/Reply';
import App from '../../stores/App';

@observer
export default class ReplyToolbar extends React.Component{
  
	render() {
    return(
      <View
				style={{
					width: '100%',
					backgroundColor: App.theme_section_background_color(),
					...Platform.select({
						android: {
							position: 'absolute',
							bottom: 0,
							right: 0,
							left: 0,
						}
					}),
					padding: 5,
					minHeight: 40,
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity style={{minWidth: 35}} onPress={() => Reply.handle_text_action("**")}>
					<Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', padding: 2, color: App.theme_text_color() }}>{"**"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{minWidth: 35}} onPress={() => Reply.handle_text_action("_")}>
					<Text style={{ fontSize: 20, fontWeight: '800', textAlign: 'center', padding: 2, color: App.theme_text_color() }}>{"_"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{minWidth: 35}} onPress={() => Reply.handle_text_action("[]")}>
					<Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', padding: 2, color: App.theme_text_color() }}>{"[ ]"}</Text>
				</TouchableOpacity>
				<View
					style={{
						position: 'absolute',
						right: 8,
						bottom: 9,
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							fontWeight: '200',
							padding: 2,
							backgroundColor: 'rgba(255,255,255,.6)'
						}}
					><Text style={{ color: Reply.reply_text_length() > 280 ? '#a94442' : 'black' }}>{Reply.reply_text_length()}</Text>/280</Text>
				</View>
			</View>
    )
  }
  
}