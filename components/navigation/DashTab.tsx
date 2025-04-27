import {Text, View, StyleSheet, Dimensions} from "react-native";
import { Icon } from '@rneui/themed'

const {width} = Dimensions.get('window')

type Props = {
    locked: boolean;
    isActive: boolean;
    pathname: string;
    id: number;
    title: string;
    onClick: (id: number) => void
}

export default function DashTab({title, onClick, id, pathname, isActive, locked}: Props) {
    return (
        <View style={[styles.tab, {backgroundColor: isActive ? '#1a1a1a' : 'transparent'}]}>
            <Text
                style={{color: isActive ? '#fff' : '#333'}}
                onPress={(!locked ? () => onClick(id) : () => {
                })}
            >
                {title}
            </Text>
            <Text>{locked ? <Icon name="lock" color={"green"} size={16} /> : null}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 5,
        borderRadius: 12,
        width: width / 4,
        color: '#fff',
        fontFamily: 'Helvetica'
    }
})