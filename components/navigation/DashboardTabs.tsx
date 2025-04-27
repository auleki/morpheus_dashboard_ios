import {ScrollView, Text, StyleSheet, Dimensions} from "react-native";
import DashTab from "@/components/navigation/DashTab";

const {width} = Dimensions.get('window')

type Props = {
    onTabClick: (id: number) => void;
    activeTabId: number;
    tabs: any[]
}

export default function DashboardTabs({onTabClick, activeTabId, tabs}: Props) {
    function handleTabClick(tabId: number) {
        onTabClick(tabId)
    }

    return (

        <ScrollView horizontal style={styles.tabs}>
            {/* TABS */}
            {tabs.map(tab => (
                <DashTab
                    locked={tab.locked}
                    onClick={handleTabClick}
                    key={tab.id}
                    id={tab.id}
                    pathname={tab.pathname}
                    isActive={activeTabId === tab.id}
                    title={tab.title}
                />
            ))}
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 10,
        overflowX: 'scroll'
    },
    tab: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        borderRadius: 12,
        width: width / 4,
        color: '#fff',
        fontFamily: 'Helvetica'
    }
})