import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seeMore: false
        };
    }

    render() {
        const COMMENT = this.props.COMMENT;
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.ONPRESS_COMMENT_ITEM()}>
                <View style={styles.contentView}>
                    <Image
                        resizeMode="cover"
                        style={styles.commentUserImage}
                        source={{
                            uri:
                                COMMENT &&
                                COMMENT.StudentImageUrl &&
                                COMMENT.StudentImageUrl !== ''
                                    ? COMMENT.StudentImageUrl
                                    : 'http://www.gravatar.com/avatar/?d=mp'
                        }}
                    />
                    <View style={styles.commentUserTextView}>
                        <Text
                            style={styles.commentUserNameText}
                            numberOfLines={2}>
                            {COMMENT.StudentName}
                        </Text>
                        <Text style={styles.commentText}>
                            {COMMENT.Comment}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default App;
