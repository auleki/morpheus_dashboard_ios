import {StyleSheet, View, Text} from "react-native";
import {useEffect, useState} from "react";
import {loadChartData} from "@/services/api";
import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import usePieChartTabs from "@/hooks/usePieChartTabs";
// import {PieChart} from "react-native-gifted-charts";
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import CenterLabel from "@/components/charts/pie/CenterLabel";
import {API_PIE_DATA} from "@/utils/dataBank";
import PieChartKeys from "@/components/charts/pie/PieChartKeys";

// ...

export default function MORHoldersChart() {
    const [apiData, setApiData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    const getChartData = async (): Promise<void> => {
        try {
            const data = await loadChartData('mor_holders_by_range')
            if (!data) 
                setApiData(API_PIE_DATA) // error here when there is no API_DATA for MorHolders
            else
                setApiData(data)
            return data
        } catch (error: any) {
            console.log({error})
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getChartData()
    }, []);

    
    
    const hasData = apiData && Object.keys(apiData).length > 0
    
    
    const {
        pieDataTabs,
        changeActiveTab,
        activePieDataTab,
        placeholderValue,
        currentChartData,
        fixedTotal,
        toggleDataInclusion,
        pieChartKeysData,
        excludedChartData
    } = usePieChartTabs({
        initialChartData: apiData,
        chartType: 'mor-holders'
    })
    
    if (isLoading) return <SkeletonLoader height={50} />
    
    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Number of MOR Holders By Range</Text>
            <Text style={styles.chartDetails}>
                Visualisation of PoL Values in USD for MOR Arbitrum Pool, Base Pool and both pools combined.
                Total Value: $4,018,950.53
            </Text>
            
            <View style={styles.chartSection}>
                {pieDataTabs.length && hasData ? (
                    <View style={styles.dataTabs}>
                        {pieDataTabs.map((dataTab, index) => (
                            <Text
                                key={index}
                                onPress={() => changeActiveTab(dataTab)}
                                style={dataTab.id === activePieDataTab.id ? styles.dataTabActive : styles.dataTab}>

                                {dataTab.title === 'total' ? 'All' : dataTab.title}
                            </Text>
                        ))}
                    </View>
                ) : (
                    <View>
                        <Text style={{ color: '#ddd' }}>No data tabs</Text>
                    </View>
                )}
                <PieChart
                    donut
                    innerRadius={95}
                    backgroundColor={"#1a1a1a"}
                    centerLabelComponent={() => (
                        <CenterLabel
                            labelText={'Total Holders'}
                            labelValue={placeholderValue}
                        />
                    )}
                    data={currentChartData}
                />
            </View>

            {/* LEGEND CONTAINER */}
            <View style={styles.legendContainer}>
                <Text style={styles.chartDetails}>LEGEND</Text>
                <PieChartKeys
                    total={fixedTotal}
                    onPress={toggleDataInclusion}
                    pieData={pieChartKeysData}
                    excludedChartData={excludedChartData}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // overflow: 'hidden',
        height: '62%',
        backgroundColor: "#1a1a1a",
        borderWidth: 2,
        borderColor: "#333",
        paddingTop: 25,
        borderRadius: 13,
        marginBottom: 0
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    dataTabActive: {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderBottomWidth: 1
    },
    chartSection: {
        gap: 25
    },
    chartTitle: {
        fontSize: 21,
        fontWeight: 'semibold',
        color: '#ddd',
        textAlign: 'center'
    },
    chartDetails: {
        color: "#9E9E9EFF",
        textAlign: 'center'
    },
    legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        height: 320
    }
})