import {View, StyleSheet, Pressable} from "react-native";
import {useEffect, useState} from "react";
import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import StatCardTabHead from "@/components/StatCardTabHead";
import StatCardTab from "@/components/StatCardTab";

type Props = {
    stats: any[];
    isLoading: boolean;
    prefix?: string | boolean;
}
export default function TabbedStatCard({prefix = '$ ', stats, isLoading = true}: Props) {
    const [activeTab, setActiveTab] = useState({})

    function switchTab(tab: {}) {
        setActiveTab(tab)
    }

    useEffect(() => {
        setActiveTab(stats[0])
    }, [stats]);

    if (isLoading) return <SkeletonLoader />

    function transformNumber(val: string) {
        const roundedUp = Number(val).toFixed(2)
        return Number(roundedUp).toLocaleString()
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabHeads}>
                {stats.map((tab, index) =>
                    <Pressable
                        key={index}
                        onPress={() => switchTab(tab)}
                        style={{ paddingVertical: 5 }}
                        >
                        <StatCardTabHead 
                            title={tab.title} 
                            isActive={tab.title === activeTab?.title} 
                            value={tab.value} 
                            tabTitle={tab.tabTitle} 
                        />
                    </Pressable>
                )}
            </View>

            <View style={styles.tabContent}>
                {activeTab && <StatCardTab title={activeTab?.title} value={transformNumber(activeTab?.value)} prefix={prefix} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1B1B1E",
        padding: 10,
        borderWidth: 2,
        borderRadius: 13,
        borderColor: "#333"
    },
    tabHeads: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
    },
    tabContent: {
        flexDirection: 'column',
        justifyContent: "center",
        gap: 10,
    }
})