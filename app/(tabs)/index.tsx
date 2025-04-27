import { Image, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ChartList from "@/components/charts/ChartList";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#1a1a1a' }}
      headerImage={
        <Image
          source={require('@/assets/images/mor_logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/*<ThemedText type={'title'}  style={{ color: '#fff' }}>Dashboard</ThemedText>*/}
      <ChartList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
