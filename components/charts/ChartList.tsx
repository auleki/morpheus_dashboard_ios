import {Text, StyleSheet, View, ScrollView} from 'react-native'
import Animated, {useAnimatedRef} from 'react-native-reanimated'
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import DashboardTabs from "@/components/navigation/DashboardTabs";
import DashboardContent from "@/components/navigation/DashboardContent";
import {useEffect, useState} from "react";
import {DASHBOARD_TABS} from "@/utils/dataBank";
import Footer from "@/components/ui/Footer";

export default function ChartList() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();
    const [dashTabs, setDashTabs] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        setDashTabs(DASHBOARD_TABS)
    }, []);

    function updateActiveTabPosition() {
        const currentTab = DASHBOARD_TABS.filter(tab => tab.id === activeTab)[0]
        const shiftSelectedTab = [currentTab, ...DASHBOARD_TABS.filter(tab => tab.id !== activeTab)]
        setDashTabs(shiftSelectedTab)
    }

    useEffect(() => updateActiveTabPosition(), [activeTab])

    const switchTab = (id: number) => setActiveTab(id)

    return (
        <View style={styles.container}>
            <DashboardTabs
                tabs={dashTabs}
                activeTabId={activeTab}
                onTabClick={switchTab}
            />
            <Animated.ScrollView
                ref={scrollRef}
                // style={styles.chartContainer}
                // scrollEventThrottle={16}
                // scrollIndicatorInsets={{bottom}}
                contentContainerStyle={{paddingBottom: bottom - 40}}
            >
                <DashboardContent
                    activeTabId={activeTab}
                />
            <Footer />
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        gap: 25,
    },
    chartContainer: {
        gap: 50,
        // height: '90%',
        marginBottom: 10
    }
})
