import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DefaultPreference from 'react-native-default-preference';
import NavigationHeader from '../../uiElements/NavigationHeader';
import { COUNTRY_LIST } from '../../../Utility/countryList';
import styles from './styles';
import { ContainedButton } from '../../uiElements/Button';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            visible: true,
            spinner: false,
            showCustomerDetails: false
        };
    }

    componentDidMount() {
        var context = this;
        DefaultPreference.get('job_user_data').then(function(user_data) {
            let userData = JSON.parse(user_data);

            var country = COUNTRY_LIST.filter(
                item => item.value == userData.CountryCode
            ).map(({ label, value }) => ({ label, value }));

            context.setState({
                customerName: userData.CustomerName,
                contactName: userData.ContactName,
                addressLine1: userData.AddressLine1,
                addressLine2: userData.AddressLine2,
                email: userData.Email,
                telNo: userData.TelNo,
                webSite: userData.WebSite,
                country: country.length > 0 ? country[0].label : ''
            });
        });
    }

    onPressPasswordChange() {
        this.props.navigation.navigate('JobPostChangePassword');
    }

    render() {
        const isAddressL2 =
            this.state.addressLine2 && this.state.addressLine2 !== '';

        return (
            <SafeAreaView style={styles.container}>
                <NavigationHeader {...this.props} screenTitle="Company" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.flex1}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <View style={styles.formContainer}>
                            <View style={styles.detailsContainer}>
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Company Name
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.customerName}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Contact Name
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.contactName}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorR} />
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Address Line1
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.addressLine1}
                                    </Text>
                                </View>
                                <View style={styles.detailSeparatorL} />
                                {isAddressL2 ? (
                                    <>
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailTitle}>
                                                Address Line2
                                            </Text>
                                            <Text style={styles.detailText}>
                                                {this.state.addressLine2}
                                            </Text>
                                        </View>
                                        <View style={styles.detailSeparatorR} />
                                    </>
                                ) : null}
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Email
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.email}
                                    </Text>
                                </View>
                                {isAddressL2 ? (
                                    <View style={styles.detailSeparatorL} />
                                ) : (
                                    <View style={styles.detailSeparatorR} />
                                )}
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        TelNo
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.telNo}
                                    </Text>
                                </View>
                                {isAddressL2 ? (
                                    <View style={styles.detailSeparatorR} />
                                ) : (
                                    <View style={styles.detailSeparatorL} />
                                )}
                                {this.state.webSite &&
                                this.state.webSite !== '' ? (
                                    <>
                                        <View style={styles.detailView}>
                                            <Text style={styles.detailTitle}>
                                                Web Site
                                            </Text>
                                            <Text style={styles.detailText}>
                                                {this.state.webSite}
                                            </Text>
                                        </View>
                                        {isAddressL2 ? (
                                            <View
                                                style={styles.detailSeparatorL}
                                            />
                                        ) : (
                                            <View
                                                style={styles.detailSeparatorR}
                                            />
                                        )}
                                    </>
                                ) : null}
                                <View style={styles.detailView}>
                                    <Text style={styles.detailTitle}>
                                        Country
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {this.state.country}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <ContainedButton
                            onPress={this.onPressPasswordChange.bind(this)}
                            label="CHANGE PASSWORD"
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default Search;
