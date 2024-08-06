import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function App() {

    const [Winner, setWinner] = useState("")
    const [isCross, setIsCross] = useState(false)
    const [gameState, setGameState] = useState(new Array("Empty", 0, 9))
    console.log("this is game State", gameState)


    const isWinner = () => {
        // for horizontal
        if (gameState !== "Empty" && gameState[0] == gameStateState[1]
            && gameState[1] == gameStateState[2]) {

            setWinner(gameState[0])
        }
        else if (gameState !== "Empty" && gameState[3] == gameStateState[4]
            && gameState[4] == gameStateState[5]) {
            setWinner(gameState(3))

        }
        else if (gameState !== "Empty" && gameState[6] == gameStateState[7]
            && gameState[7] == gameStateState[8]) {
            setWinner(gameState(6))

        }
        else if (gameState !== "Empty" && gameState[6] == gameStateState[7]
            && gameState[7] == gameStateState[8]) {
            setWinner(gameState(6))

        }



    }
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <Pressable onLongPress={() => (
                router.replace("/Setting")
            )}>
                <Text>
                    Setting
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
