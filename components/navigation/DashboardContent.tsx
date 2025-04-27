import {View, StyleSheet} from "react-native";
import {DASHBOARD_TABS} from "@/utils/dataBank";
import CapitalCharts from "@/components/charts/capital";
import CodeCharts from "@/components/charts/code";
import StakingCharts from "@/components/charts/staking";
import SupplyCharts from "@/components/charts/supply";
import {DASH_CHART_SECTIONS} from "@/utils/Links";

type Props = {
    activeTabId: number;
}
export default function DashboardContent ({activeTabId}: Readonly<Props>) {
    
    function pickActiveTab(tabId: number) {
        const activeContent = DASHBOARD_TABS.filter(tab => tab.id === tabId)[0]

        switch (activeContent.pathname) {
            case DASH_CHART_SECTIONS.CAPITAL:
                return <CapitalCharts/>
            case DASH_CHART_SECTIONS.CODE:
                return <CodeCharts/>
            case DASH_CHART_SECTIONS.STAKING:
                return <StakingCharts/>
            case DASH_CHART_SECTIONS.SUPPLY:
                return <SupplyCharts/>
        }
    }
    
    return (
        <View style={styles.container}>
            {pickActiveTab(activeTabId)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})