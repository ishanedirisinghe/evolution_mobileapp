/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import DefaultPreference from 'react-native-default-preference';
import HTML from 'react-native-render-html';
import AutoHeightImage from 'react-native-auto-height-image';
import moment from 'moment';

import Buttons from '../../uiElements/Buttons/RoundButtons';
import NavBarWithBack from '../../uiElements/NavBarWithBack';
import { COUNTRY_LIST } from "../../../Utility/countryList";

import { MAIN_FONT } from "../../../Utility/FontsStyle/font"

const imageWidth = Dimensions.get('window').width;
import NavBar from '../../uiElements/NavBar';

const countryPlaceholder = {
    label: 'Select country',
    value: null,
    color: "#841c7c",
};

import styles from './styles';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            spinner: false,
            showCustomerDetails: false,
        };
    }

    componentDidMount() {
        var context = this;
        const { APPLICANT } = this.props.navigation.state.params;
        context.setState({
            loading: false,
            error: '',
            currentApplicant: APPLICANT
        }, () => {
            // this.getInquiryCommentListData(this.page);
        });

    }

    onPressPasswordChange() {
        this.props.navigation.navigate("JobPostChangePassword");

    }

    onDownloadCV = (url) => {
        this.loadInBrowser(url)
    }

    onDownloadCoveringLetter = (url) => {
        Linking.openURL(url).catch(err => { }
        );
    }

    loadInBrowser(url) {
        Linking.openURL(url).catch(err => { }
        );

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <NavBarWithBack name={"Applicant Details"} onPressBack={() => this.props.navigation.goBack()} />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.centerContainer}>
                    <ScrollView keyboardShouldPersistTaps="handled">

                        <Spinner visible={this.state.spinner} textContent={'Loading...'} />

                        {this.state.currentApplicant ?
                            <View style={{ margin: wp('5%') }}>

                                <Text style={styles.titleLabelText}>{"Applicant Name"}</Text>
                                <Text style={styles.valueLabelText}>{this.state.currentApplicant.ApplicantName}</Text>

                                <Text style={styles.titleLabelText}>{"TelNo"}</Text>
                                <Text style={styles.valueLabelText}>{this.state.currentApplicant.ApplicantTelNo}</Text>

                                <Text style={styles.titleLabelText}>{"Email"}</Text>
                                <Text style={styles.valueLabelText}>{this.state.currentApplicant.ApplicantEmail}</Text>

                                <Text style={styles.titleLabelText}>{"Date"}</Text>
                                <Text style={styles.valueLabelText}>{moment(this.state.currentApplicant.ApplicantDate).format('DD/MM/YYYY h:mm A')}</Text>

                                <Text style={styles.titleLabelText}>{"CV"}</Text>
                                <View style={{ alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('5%') }}>
                                    <TouchableOpacity style={styles.buttonView} onPress={() => this.onDownloadCV(this.state.currentApplicant.CVPath)}>
                                        <Text style={styles.buttonText}>Download CV</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.titleLabelText}>{"Covering Letter"}</Text>
                                {this.state.currentApplicant.CoveringLetter == "" ?
                                    <View style={{ alignItems: 'center', paddingTop: wp('2%'), paddingBottom: wp('5%') }}>
                                        <TouchableOpacity style={styles.buttonView} onPress={() => this.onDownloadCoveringLetter(this.state.currentApplicant.CLPath)}>
                                            <Text style={styles.buttonText}>Download Covering Letter</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <HTML
                                        containerStyle={{ height: 'auto', paddingTop: wp('3%'), width: wp('90%'), fontFamily: 'Montserrat', }}
                                        html={this.state.currentApplicant.CoveringLetter}
                                        contentWidth={wp('94%')}
                                    // tagsStyles={tagsStyles}
                                    />
                                }
                            </View>
                            : null}
                    </ScrollView>

                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}

export default Search;

