import { StyleSheet, View, Text } from "react-native";
import { Icon } from '@rneui/themed'
import { useEffect, useState } from "react";
import SkeletonLoader from "./loaders/SkeletonLoader";

export default function Footer() {
    const [isPageReady, setIsPageReady] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsPageReady(false), 3000)
    }, [])

    if (isPageReady) return (
        <SkeletonLoader />
    )

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Have any suggestions? Join the Discord here</Text>
            <View style={styles.socialIcons}>
                <Icon name='discord' />
                <Icon name='logo-twitter' type="ionicon" />
                <Icon name='telegram' />
                <Icon name='logo-github' type="ionicon" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "crimson"
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333'
    },
    socialIcons: {
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
