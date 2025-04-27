import {Text, View, StyleSheet} from "react-native";
import TabbedStatCard from "@/components/TabbedStatCard";
import {useEffect, useState} from "react";
import {loadChartData} from "@/services/api";
import {LIQUIDITY_STATS} from "@/utils/dataBank";
import MORHoldersChart from "@/components/charts/supply/MORHoldersChart";
import LockedBurnedMORChart from "@/components/charts/supply/LockedBurnedMORChart";
// import DailyEmissionsChart from "@/components/charts/supply/DailyEmissionsChart";

export default function SupplyCharts() {
    const [supplyCapData, setSupplyCapData] = useState<any[]>([])
    const [positionsData, setPositionsData] = useState<any[]>([])
    const [capIsLoading, setCapIsLoading] = useState<boolean>(true)

    async function initializeSupplyCharts(): Promise<void> {
        setCapIsLoading(true)
        const supplyCapStats = await loadChartData('get_market_cap')
        const positionStats = await loadChartData('protocol_liquidity')

        // console.log({supplyCapStats, positionStats})

        const formattedSupplyStats = Object.entries(supplyCapStats).map((([title, value]) => {
            const tabTitle = title.split('_').join(' ')
            return {title: tabTitle, tabTitle: tabTitle.split(' ')[0], value}
        }))

        const formattedPositionData = LIQUIDITY_STATS.map(stat => ({
            ...stat,
            value: positionStats[stat.key]
        }))
        
        // console.log({formattedPositionData, formattedSupplyStats})

        setSupplyCapData(formattedSupplyStats)
        setPositionsData(formattedPositionData)
        setCapIsLoading(false)
    }

    useEffect(() => {
        initializeSupplyCharts()
    }, []);

    return (
        <View style={styles.container}>
            <TabbedStatCard stats={supplyCapData} isLoading={capIsLoading} />
            <TabbedStatCard stats={positionsData} isLoading={capIsLoading} />
            <View><LockedBurnedMORChart /></View>
            {/*<View><DailyEmissionsChart /></View>*/}
            <View><MORHoldersChart /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        // paddingBottom: 60
    }
})