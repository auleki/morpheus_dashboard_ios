import {StyleSheet, Text, View} from "react-native";

export default function DailyEmissionsChart() {
    return (
        <View style={styles.container}>
            <Text>Daily Emissions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        height: 400,
        borderWidth: 2,
        borderColor: "#333",
        borderRadius: 13,
        justifyContent: 'center'
    },
    chartButtons: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    }
})
