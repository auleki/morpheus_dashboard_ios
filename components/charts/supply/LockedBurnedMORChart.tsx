import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {TabDataType} from "@/types/charts";
import useSimpleTab from "@/hooks/useSimpleTab";
import {transformNumber} from "@/utils/utils";
import {loadChartData} from "@/services/api";
import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import SimpleTab from "@/components/tabs/common/SimpleTab";
import {VictoryChart, VictoryTheme, VictoryLine} from 'victory-native'


const TABS_DATA = [
    {
        tabTitle: "Burned",
        id: 1,
        accessor: "burnt_mor",
        deepaccessor: "cumulative_mor_burnt",
        totalaccessor: "total_burnt_till_now"
    },
    {
        tabTitle: "Locked",
        id: 2,
        accessor: "locked_mor",
        deepaccessor: "cumulative_mor_locked",
        totalaccessor: "total_locked_till_now"
    }
]

const {width} = Dimensions.get('window')

function determinePadding (width: number): number {
    let padding = 0;
    if (width < 380) {
        padding = 115
    }  else {
        padding = 75
    }
    return padding;
}
export default function LockedBurnedMORChart() {
    const [chartData, setChartData] = useState([])
    const [currentChartData, setCurrentChartData] = useState<{}[]>([])
    const [currentChartInfo, setCurrentChartInfo] = useState<{}>({})
    const [activeChart, setActiveChart] = useState<null | number>(null)
    const [chartCurrentTab, setChartCurrentTab] = useState<TabDataType | null>(null)
    const {activeTab, switchActiveTab, tabs, updateTabs, currentTab} = useSimpleTab(TABS_DATA)
    const [isLoading, setIsLoading] = useState(true)

    function formatText(_activeTab: number | null, _value: number) {
        if (!_activeTab) return "No Active Tab"
        const _currentTab = tabs.filter(tab => tab.id === _activeTab)[0]
        return `Total ${_currentTab.tabTitle} MOR till now: ${transformNumber(_value.toString())} MOR`
    }

    useEffect(() => {
        const getChartData = async () => {
            try {

                const result = await loadChartData('locked_and_burnt_mor')
                

                const updatedTabs: TabDataType[] = tabs.map(tab => {
                    if (tab.tabTitle === "Burned")
                        return ({
                            ...tab,
                            value: result["burnt_mor"]["total_burnt_till_now"],
                        })

                    if (tab.tabTitle === "Locked")
                        return ({
                            ...tab,
                            value: result["locked_mor"]["total_locked_till_now"],
                        })
                })

                let _currentTab = tabs[0]
                const _updatedCurrentTab = updateTabs(updatedTabs, _currentTab.id)
                setChartCurrentTab(_updatedCurrentTab)

                switchActiveTab(_currentTab.id)
                // setChartCurrentTab()
                setChartData(result)

                if (Object.keys(result).length) {
                    const _currentChartData = result?.[_currentTab?.accessor][_currentTab?.deepaccessor]

                    const _newChartData = Object.entries(_currentChartData).map(([key, value]) => {
                        return {x: key, y: value}
                    })

                    const _currentChartInfo = {
                        total: result?.[_currentTab?.accessor][_currentTab?.totalaccessor],
                        chartData: _newChartData
                    }

                    setCurrentChartInfo(_currentChartInfo)
                    const slicedData = _newChartData.splice(0, 5)
                    setCurrentChartData(slicedData)
                    return result
                }
            } catch (error) {
                console.log('Error while loading Locked & Burned Chart', {error})
            } finally {
                setIsLoading(false)
            }
        }

        getChartData()
    }, [])

    const traverseChartData = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            // if

            // disable button if the pointer is less than or equal to 5
        }

        if (direction === 'right') {
            // go 5 rows over and start from there

            // if the length of what is left is less than 5, 
            // switch pointer to start from the end of the 
            // array and pick last five rows
        }
    }

    const switchTab = (id: number) => {
        switchActiveTab(id)
        const _currentTab = tabs.filter(tab => tab.id === activeTab)[0]
        const dataToFormat = chartData?.[_currentTab?.accessor][_currentTab?.deepaccessor]
        setChartCurrentTab(currentTab => _currentTab)

        const _currentChartData = Object.entries(dataToFormat)
            .map(([key, value]) => {
                return {x: key, y: value}
            })

        const _currentChartInfo = {
            total: chartData?.[_currentTab?.accessor][_currentTab?.totalaccessor],
            chartData: _currentChartData
        }

        setCurrentChartInfo(_currentChartInfo)

        const splicedData = _currentChartData.splice(0, 5)
        setCurrentChartData(splicedData)
    }

    if (isLoading) return (
        <SkeletonLoader/>
    )

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginTop: 10, fontWeight: 400, marginBottom: 5, color: "#fff" }}>Locked & Burned MOR</Text>
            {activeTab ?  (
                <SimpleTab
                    activeTab={activeTab}
                    data={tabs}
                    switchActiveTab={switchTab}
                />
            ) : null}
            
            <View>
                <Text style={styles.chartDescription}>Total {tabs.filter(tab => tab.id === activeTab)[0].tabTitle} MOR till now: {Number(tabs.filter(tab => tab.id === activeTab)[0].value).toFixed(2)} MOR</Text>
            </View>

            <VictoryChart 
                theme={VictoryTheme.material}
                // containerComponent={<View><Text>I am a badass</Text></View>}
                // style={}
                height={400}
                padding={{ left: 42, top: 20, bottom: 30, right: 5 }}
                // domainPadding={{x: [10, 0]}}
                width={width - determinePadding(width)}
            >
                <VictoryLine
                    data={currentChartData}
                    x="x"
                    y="y"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "#0D6733FF" },
                        parent: { border: "1px solid #1a1a1a" }
                    }}
                />
            </VictoryChart>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#1B1B1E",
        overflow: 'hidden',
        // height: 400,
        borderWidth: 2,
        borderColor: "#333",
        borderRadius: 13,
        justifyContent: 'center'
    },
    chartDescription: {
        color: '#888',
        fontStyle: 'italic',
        marginBottom: 10,
        fontSize: 15
    },
    chartButtons: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    }
})
