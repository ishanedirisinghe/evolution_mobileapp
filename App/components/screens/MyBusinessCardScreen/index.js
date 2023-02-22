import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { showMessage } from 'react-native-flash-message';
import HamNavigationHeader from '../uiElements/HamNavigationHeader';
import styles from './styles';
import { Colors } from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import BCQR_POPUP from '../uiElements/BCQRPopup';

const ICONS = {
    LOGO_ICON: require('../../../assets/images/evolution_logo.png'),
    MOBILE_ICON: require('../../../assets/images/ic_mobile.png'),
    EMAIL_ICON: require('../../../assets/images/ic_email.png'),
    MARKER_ICON: require('../../../assets/images/ic_marker.png')
};

class MyBusinessCardScreen extends Component {
    fieldRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            fullName: '',
            firstName: '',
            lastName: '',
            mobile: '',
            address: '',
            profileImageUrl: '',
            qrCodeUrl: '',
            email: '',
            Position: '',
            dataList: [],
            showqrCodePopup: false
        };
    }

    componentDidMount() {
        this.setState({ callFunction: true });
        this.updateData();
        this.props.navigation.addListener('didFocus', () => {
            this.setState({ callFunction: true });
            this.updateData();
        });
    }

    async updateData() {
        const user_persist_data = await DefaultPreference.get('user_data');
        const jsonUserData = JSON.parse(user_persist_data);

        const studentId = jsonUserData.StudentID;

        var context = this;
        context.setState({ spinner: true });

        let requestPath =
            global.API_ENDPOINT +
            `/api/StudentAPI/GetVCardInfo?ContactID=${studentId}`;

        fetch(requestPath, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + global.session.access_token
            }
        })
            .then(response => response.text())
            .then(result => {
                context.setState({ spinner: false });
                var resultJson = JSON.parse(result);
                console.log(resultJson);
                this.setState({
                    userType: resultJson.StudentTypeName,
                    firstName: resultJson.FirstName,
                    lastName: resultJson.LastName,
                    fullName: resultJson.Name,
                    mobile: resultJson.Phone,
                    address: resultJson.Address,
                    profileImageUrl: resultJson.ImageUrl,
                    qrCodeUrl: resultJson.QRUrl,
                    email: resultJson.eMail,
                    Position: resultJson.Position,
                    dataList: Array.isArray(resultJson.DataList)
                        ? resultJson.DataList
                        : []
                });
            })
            .catch(error => {
                if (context.state.callFunction) {
                    context.setState({ callFunction: false });
                    context.updateData();
                } else {
                    context.setState({ spinner: false });
                    console.log('DEBUG: GetStudentInfo request failed.', error);
                    showMessage({
                        message: 'Error',
                        description:
                            'Unknown server error. Please check your internet connection. Contact support if issue prevails.',
                        type: 'danger'
                    });
                }
            });
    }

    showQRModal = () => {
        this.setState({
            showqrCodePopup: true
        });
    };

    onPressClosePopup = () => {
        this.setState({
            showqrCodePopup: false
        });
    };

    renderDataList = () => {
        if (this.state.dataList.length > 0) {
            return this.state.dataList.map((dataItem, index) => {
                return (
                    <View key={+index} style={styles.detailView}>
                        <Image
                            style={styles.detailIcon}
                            resizeMode="contain"
                            source={{ uri: dataItem.Url }}
                        />
                        <Text style={styles.detailText}>{dataItem.Value}</Text>
                    </View>
                );
            });
        } else {
            return null;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <HamNavigationHeader
                    {...this.props}
                    screenTitle={'Business Card'}
                />
                <ScrollView>
                    <View style={styles.formContainer}>
                        <View style={styles.avatarContainer}>
                            <View>
                                <Image
                                    resizeMode="cover"
                                    style={styles.avatar}
                                    source={{ uri: this.state.profileImageUrl }}
                                />
                            </View>
                            <View style={styles.nameContainer}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.fNameText}>
                                    {this.state.firstName}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={styles.lNameText}>
                                    {this.state.lastName}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={styles.designationText}>
                                    {this.state.Position}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.qrCodeContainer}
                                onPress={this.showQRModal}>
                                <Image
                                    style={styles.qrCodeImage}
                                    resizeMode="cover"
                                    source={{
                                        uri: this.state.qrCodeUrl
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.logoImageContainer}>
                            <Image
                                style={styles.logoImage}
                                source={ICONS.LOGO_ICON}
                                resizeMode="contain"
                            />
                        </View>
                        <LinearGradient
                            style={styles.detailsContainer}
                            colors={[
                                Colors.GRADIENT.GRADIENT_START,
                                Colors.GRADIENT.GRADIENT_END
                            ]}>
                            <View style={styles.detailBody}>
                                {this.renderDataList()}
                            </View>
                            <Text style={styles.siteLinkText}>
                                www.evolution.edu.au
                            </Text>
                        </LinearGradient>
                    </View>
                </ScrollView>
                {this.state.showqrCodePopup ? (
                    <BCQR_POPUP
                        URL={this.state.qrCodeUrl}
                        onPressClose={this.onPressClosePopup}
                    />
                ) : null}
            </SafeAreaView>
        );
    }
}

export default MyBusinessCardScreen;
