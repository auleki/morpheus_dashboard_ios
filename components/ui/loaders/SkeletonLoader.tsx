import {Skeleton} from "@rneui/base";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const { width } = Dimensions.get('screen')

type Props = {
    height?: number;
}

export default function SkeletonLoader({ height = 40 }: Props) {
    return (
        <View style={styles.loadingContainer}>
            <Skeleton
                width={width - 60}
                height={height}
                skeletonStyle={styles.skeletonStyle}
                LinearGradientComponent={() => (
                    <View style={styles.skeletonStyle} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        // backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonStyle: {
        backgroundColor: '#333',
    }
})