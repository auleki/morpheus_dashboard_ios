import {PieDataType} from "@/types/charts";
import {ScrollView, StyleSheet} from "react-native";
import PieChartKey from "@/components/charts/pie/PieChartKey";

type Props = {
    pieData: PieDataType[];
    onPress?: Function;
    excludedChartData: number[];
    total: number
}
export default function PieChartKeys({pieData, onPress, excludedChartData, total}: Props) {
    return (
        <ScrollView 
            horizontal={false}  
            showsVerticalScrollIndicator 
            style={styles.container}
        >
            {pieData?.map((data, index) => (
                <PieChartKey
                    total={total}
                    isExcluded={excludedChartData.includes(data.id)}
                    id={data.id}
                    onPress={onPress}
                    range={data.keyValue}
                    value={data.value}
                    color={data.color}
                    key={data.id}/>
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
        width: '80%',
        display: 'flex',
        gap: 10,
        height: '90%',
        paddingTop: 10,
    },
    chartKey: {
        height: 10,
        width: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
    },
    keyContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})
