import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message';
import { OutlinedTextInput } from '../uiElements/TextInput';
import { BottomBackButton, ContainedButton } from '../uiElements/Button';
import { styles } from './styles'

const UserInfo = ({ navigation }) => {
    const [data, setData] = useState({});

    // uncomment this once implemented
    //const courseId = navigation.state.params.courseID

    const handleSubmit = () => {

        if (Object.keys(data).length === 0) {
            showMessage({
                message: 'Error',
                description: "Data is required!",
                type: 'danger'
            });
        } else {
            axios
                .post('http://221.121.154.219/Attendance/API/ShortCourseAPI/ApplyShortCourse',
                    {
                        "shortCourseID": data.id,
                        "firstname": data.firstname,
                        "lastName": data.lastName,
                        "email": data.email,
                        "DateOfBirth": data.DateOfBirth,
                        "country": data.country,
                        "mobile": data.mobile
                    }
                )
                .then(response => {
                    console.log("response", response);
                    navigation.navigate('PaymentScreen', {
                        ShortCourseApplyID: response.data.ShortCourseApplyID
                    })
                })
                .catch(err => {
                    if (err && err.response) {
                        console.log('failed', err.response.data.Message);
                        showMessage({
                            message: 'Error',
                            description: err.response.data.Message,
                            type: 'danger'
                        });
                    }
                });
        }
    }

    console.log("data", data);
    return (
        <SafeAreaView style={styles.contianer}>
            <Text style={styles.title}>User Information</Text>

            <View style={styles.formView}>
                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Course ID',
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            id: text
                        })
                    }
                />
                <View style={styles.H20} />

                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'First Name',
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            firstname: text
                        })
                    }
                />
                <View style={styles.H20} />

                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Last Name',
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            lastName: text
                        })
                    }
                />
                <View style={styles.H20} />
                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Email',
                        keyboardType: 'email-address'
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            email: text
                        })
                    }
                />
                <View style={styles.H20} />
                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Birthday',
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            DateOfBirth: text
                        })
                    }
                />
                <View style={styles.H20} />
                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Country',
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            country: text
                        })
                    }
                />
                <View style={styles.H20} />
                <OutlinedTextInput
                    textInputProps={{
                        placeholder: 'Mobile',
                        keyboardType: 'phone-pad'
                    }}
                    onChangeText={text =>
                        setData({
                            ...data,
                            mobile: text
                        })
                    }
                />
            </View>
            <View style={styles.H20} />

            <View style={styles.actionContainer}>
                <ContainedButton
                    onPress={handleSubmit}
                    label="SUBMIT"
                />
            </View>

        </SafeAreaView>
    )
}

export default UserInfo