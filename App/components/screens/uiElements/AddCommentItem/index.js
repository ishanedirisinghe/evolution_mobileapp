import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import styles from './styles';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seeMore: false,
            userImageUrl: ''
        };
    }

    componentDidMount() {
        var context = this;
        DefaultPreference.get('user_data').then(function(user_data) {
            var jsonUserData = JSON.parse(user_data);
            context.setState({ userImageUrl: jsonUserData.ImageUrl });
        });
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.ONPRESS_ADD_COMMENT_ITEM()}>
                <View style={styles.contentView}>
                    <Image
                        resizeMode="cover"
                        style={styles.addCommentUserImage}
                        source={{
                            uri:
                                this.state.userImageUrl &&
                                this.state.userImageUrl != ''
                                    ? this.state.userImageUrl
                                    : 'http://www.gravatar.com/avatar/?d=mp'
                        }}
                    />
                    <View style={styles.addCommentUserTextView}>
                        <Text style={styles.addCommentText} numberOfLines={1}>
                            Write a comment...
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default App;
