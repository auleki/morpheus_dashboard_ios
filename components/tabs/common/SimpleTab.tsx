import StatCardTabHead from "@/components/StatCardTabHead";
import { StyleSheet, View, Pressable } from "react-native";

type Props = {
    data: any[];
    switchActiveTab: (id: number) => void;
    activeTab: number | null;
}

export default function SimpleTab({ data, switchActiveTab, activeTab }: Props) {

    return (
        <View style={styles.tabHeads}>
            {data.map((tab, index) =>
                <Pressable
                    key={index}
                    onPress={() => switchActiveTab(tab.id)}
                    style={{ paddingVertical: 5 }}
                >
                    <StatCardTabHead
                        isActive={tab.id === activeTab}
                        title={tab.title}
                        value={tab.value}
                        tabTitle={tab.tabTitle}
                    />
                </Pressable>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {},
    tabHeads: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
    },
})
