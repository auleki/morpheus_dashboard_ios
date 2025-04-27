import {useEffect, useState} from "react";
import {PieDataType} from "@/types/charts";
import {generateUniqueColors} from "@/utils/utils";
import {CHART_TYPES} from "@/utils/enum";

type Props = {
    initialChartData: {};
    chartType: 'mor-holders' | 'power-multiplier' | 'code-rewards'
}

export default function usePieChartTabs({chartType, initialChartData}: Props) {
    const [pieDataTabs, setPieDataTabs] = useState<{ id: number; title: string }[]>([])
    const [chartData, setChartData] = useState<{} | []>(initialChartData)
    const [currentChartData, setCurrentChartData] = useState<{} | any[]>([])
    const [formattedData, setFormattedData] = useState<PieDataType[]>([])
    const [activePieDataTab, setActivePieDataTab] = useState<{ id: number } | null>(null)
    const [placeholderValue, setPlaceholderValue] = useState<number | string>(0)
    const [fixedTotal, setFixedTotal] = useState<number>(0)
    const [pieChartKeysData, setPieChartKeysData] = useState<{ tabTitle: string, slug: string }[]>([])
    const [currentPieChartKeysData, setCurrentPieChartKeysData] = useState<{}[]>([])
    const [excludedChartData, setExcludedChartData] = useState<any[]>([])

    useEffect(() => {
        // console.log({initialChartData})
        if (!initialChartData) return  
        setChartData(initialChartData)
        createPieDataTabs(initialChartData)
    }, [initialChartData]);

    useEffect(() => {
        if ((!activePieDataTab || Object?.keys(activePieDataTab).length === 0) && chartType !== 'code-rewards') {
            return; // Return early if activePieDataTab is empty or null/undefined
        }
        createPieChartKeys(initialChartData)
    }, [activePieDataTab, initialChartData])

    function toggleDataInclusion(
        id: number,
    ) {
        if (chartType === 'code-rewards') return

        if (excludedChartData.includes(id)) {
            // data is hidden -> show the data
            const returnedData: PieDataType = formattedData.filter((cdata: PieDataType) => cdata.id === id)[0]
            setPlaceholderValue(total => Number(total) + Number(returnedData.value))
            setExcludedChartData((data: any) => excludedChartData.filter(_id => _id != id))
            setCurrentChartData((pdata: PieDataType[]) => [...pdata, returnedData])
        } else {
            // data is shown -> hide the data
            if (currentChartData && currentChartData.length === 1) return
            let _removedData = {}

            const _filteredPieData = currentChartData.filter((piedata: PieDataType) => {
                if (piedata.id === id) _removedData = piedata
                return piedata.id != id
            })

            setPlaceholderValue(total => Number(total) - Number(_removedData.value))
            setExcludedChartData(xData => [id, ...xData])
            setCurrentChartData(_filteredPieData)
        }
    }

    function createPieDataTabs(_chartData: {}) {
        if (chartType === CHART_TYPES.MOR_HOLDERS && Object.keys(_chartData).length) {
            // console.log('Right spot', _chartData)
            const keys = Object?.keys(_chartData)
            const _tabs = keys.map((key, index) => ({title: key, id: ++index}))
            // console.log({_tabs})
            setPieDataTabs(_tabs)
            setActivePieDataTab(_tabs[0])
        }

        if (chartType === CHART_TYPES.POWER_MULTIPLIER) {
            const _dataEntries = Object.entries(_chartData)
            const _tabKeys = _dataEntries.map((data, idx) => ({
                tabTitle: formatTabTitle(data[0]),
                title: data[0],
                id: ++idx
            }))
            // console.log('Tabs Power Multi', { _chartData, _dataEntries, _tabKeys });
            setPieDataTabs(_tabKeys)
            setActivePieDataTab(_tabKeys[0])
            // console.log({ _dataEntries, _tabKeys, })
        }

        if (chartType === CHART_TYPES.CODE_REWARDS) {

            function transformData(_chartData: {}[]) {
                const uniqueColors = generateUniqueColors(_chartData.length)
                const chartDataWithColors = _chartData.map((data, idx) => ({...data, color: uniqueColors[idx]}))
                return chartDataWithColors
            }

            const chartData = _chartData?.claim_metrics?.code;
            const totalEmissions = chartData?.total_code_emissions;
            const claimed = chartData?.claimed_code_rewards;
            const unclaimed = chartData?.unclaimed_code_emissions;
            const stakedUnclaimed = chartData?.total_code_staked_reward_sum;
            const unclaimedNotStaked = unclaimed - stakedUnclaimed;
            const keys = [
                {
                    title: 'Emissions',
                    value: totalEmissions
                },
                {
                    title: 'Claimed',
                    value: claimed
                },
                {
                    title: 'Unclaimed',
                    value: unclaimed
                },
                {
                    title: 'Staked (Unclaimed)',
                    value: stakedUnclaimed
                },
                {
                    title: 'Unstaked (Unclaimed)',
                    value: unclaimedNotStaked
                }
            ]
            const legendData = keys.map((data, idx) => ({keyValue: data.title, value: data.value, id: ++idx}))
            const transformedData = transformData([...legendData])
            setChartData(transformedData)
        }
    }

    function createPieChartKeys(_chartData: {}) {
        const _keys = _chartData && Object?.keys(_chartData)
        if (_keys.length !== 0) {
            if (chartType === CHART_TYPES.MOR_HOLDERS || chartType === CHART_TYPES.POWER_MULTIPLIER) {
                formatDataForPieChart(_chartData[activePieDataTab?.title])
            }

            if (chartType === CHART_TYPES.CODE_REWARDS) {
                formatDataForPieChart(_chartData)
            }
        }
    }

    function changeActiveTab(tab: {}) {
        setActivePieDataTab(tab)
        setExcludedChartData([])
    }

    function formatTabTitle(title: string) {
        return title.split('_').join(' ')
    }

    function formatDataForPieChart(data: { [key: string]: any } = {}) {
        if (chartType !== 'code-rewards') {
            let formattedChartData: any[] = []

            const _dataEntry = Object.entries(data)
            let _placeholderValue = 0;
            const _tabKeys = _dataEntry.map((data, idx) => ({
                tabTitle: formatTabTitle(data[0]),
                title: data[0],
                id: ++idx
            }))

            setCurrentPieChartKeysData(_tabKeys)
            // console.log({keys: _tabKeys})
            if (chartType === 'mor-holders') {
                const uniqueColors = generateUniqueColors(Object.keys(data).length)
                for (let i = 0; i < _dataEntry.length; i++) {
                    if (_dataEntry[i][1] <= 0) continue

                    formattedChartData = [
                        {
                            value: _dataEntry[i][1],
                            keyValue: _dataEntry[i][0],
                            id: i + 1,
                            color: uniqueColors[i]
                        },
                        ...formattedChartData
                    ]
                    _placeholderValue += Number(_dataEntry[i][1])
                }
            }

            if (chartType === 'power-multiplier') {
                // console.log({ initial: data['power_multiplier'] });
                const _data = data['power_multiplier']
                const rangeData = _data['ranges']
                // console.log({ freq: _data });
                const _chartData = rangeData.map((range, index) => ({
                    range: range[1] === null ? `${range[0].toFixed(2)}+` : `${range[0].toFixed(2)}-${range[1].toFixed(2)}`,
                    value: _data['frequencies'][index]
                }))
                const total = _chartData.reduce((sum, item) => sum + item.value, 0)
                const finalData = _chartData.map(item => {
                    return {
                        ...item,
                        percentage: `${((item.value / total) * 100).toFixed(2)}%`
                    }
                })

                const uniqueColors = generateUniqueColors(finalData.length)
                // console.log({ finalData, uniqueColors, len: finalData.length });

                for (let i = 0; i < finalData.length; i++) {
                    // console.log({ [i]: finalData[i] })

                    formattedChartData = [
                        {
                            value: finalData[i].percentage,
                            keyValue: finalData[i].range,
                            id: i + 1,
                            color: uniqueColors[i]
                        },
                        ...formattedChartData
                    ]
                }
                // console.log({ outsideFor: formattedChartData });
            }

            setPieChartKeysData(formattedChartData.reverse())
            setFormattedData(formattedChartData)
            setCurrentChartData(formattedChartData)
            setPlaceholderValue(_placeholderValue)
            setFixedTotal(_placeholderValue)
        }

        if (chartType === 'code-rewards') {
            const _chartData: any[] = chartData;
            const otherEmissions = [..._chartData.filter(data => data?.keyValue !== 'Emissions')]
            const totalEmission = [..._chartData].filter(data => data?.keyValue === 'Emissions')[0]
            setCurrentChartData(otherEmissions)
            setPieChartKeysData(_chartData)
            setPlaceholderValue(Number(Number(totalEmission?.value).toFixed(2)).toLocaleString())
        }


    }

    return {
        pieDataTabs,
        toggleDataInclusion,
        currentChartData,
        formattedData,
        activePieDataTab,
        placeholderValue,
        fixedTotal,
        changeActiveTab,
        pieChartKeysData,
        currentPieChartKeysData,
        excludedChartData
    }
}