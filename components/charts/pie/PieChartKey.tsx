import {Pressable, StyleSheet, Text, View} from "react-native";
import {calculatePercentage, thousandTextParser} from "@/utils/utils";

type Props = {
    range: string,
    color: string,
    onPress: Function,
    id: number,
    isExcluded: boolean,
    value: number | string,
    total: number
}
export default function PieChartKey({range, color, onPress, id, isExcluded, value, total}: Props) {
    return (
        <Pressable onPress={() => onPress(id)}>
            <View style={{...styles.keyContainer, backgroundColor: `${isExcluded ? '#000' : '#333'}`}}>
                <View style={styles.alignKey}>
                    <View style={{backgroundColor: color, ...styles.chartKey, alignSelf: 'center'}}/>
                    <View style={styles.labelContainer}>
                        <Text
                            style={{
                                ...styles.keyLabel,
                                color: isExcluded ? '#1a1a1a' : '#ddd',
                                textDecorationLine: `${isExcluded ? 'line-through' : 'none'}`
                            }}>
                            {thousandTextParser(range)}<Text style={{fontSize: 10, color: "#767676FF"}}>(MOR)</Text>
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={{
                        ...styles.keyValue,
                        color: isExcluded ? '#1a1a1a' : '#ddd',
                        textDecorationLine: `${isExcluded ? 'line-through' : 'none'}`
                    }}>
                        <Text>
                            {value?.toLocaleString()}
                        </Text>
                        <Text style={{fontSize: 14, fontWeight: '400', color: "#767676FF"}}>
                            ({calculatePercentage(Number(value), Number(total))}%)
                        </Text>
                        <Text style={{fontSize: 10, fontWeight: '400', color: "#767676FF"}}>Holders</Text>
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chartKey: {
        height: 10,
        width: 20,
        borderRadius: 3,
        color: "#fff",
        alignItems: 'center'
    },
    alignKey: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40
    },
    labelContainer: {
        // label container styles
    },
    keyContainer: {
        cursor: 'pointer',
        display: 'flex',
        // borderWidth: 2,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: 250,
        flex: 3,
        // backgroundColor: "crimson",
        borderRadius: 5,
        padding: 5,
    },
    keyLabel: {
        color: "#fff",

    },
    keyValue: {
        fontWeight: 'bold',
        color: "#fff",
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex'
    }
})
