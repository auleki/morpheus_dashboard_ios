import {Text, View, StyleSheet} from "react-native";
import {useEffect} from "react";

export default function StakingCharts() {
    useEffect(() => {
        console.log('Loading Staking Charts')
    }, []);
    
    return (
        <View>
            <Text style={{fontSize: 21, color: "#fff"}}> Staking Charts</Text>
        </View>
    )
}