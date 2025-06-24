import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get('screen')

type Props = {
    height?: number;
}

export default function SkeletonLoader({ height = 40 }: Props) {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [shimmerAnim]);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    });

    return (
        <View style={styles.loadingContainer}>
            <View style={[styles.skeleton, { width: width - 60, height }]}>
                <Animated.View
                    style={[
                        styles.shimmer,
                        {
                            height,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeleton: {
        backgroundColor: '#333',
        borderRadius: 8,
        overflow: 'hidden',
    },
    shimmer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '60%',
        borderRadius: 8,
    },
});