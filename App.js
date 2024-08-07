import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Cross } from "./constants/icons"
import { Pen } from "./constants/icons"
import { Circle } from "./constants/icons"
import Card from './src/component/Card';
import Snackbar from 'react-native-snackbar';
export default function App() {

    const [Winner, setWinner] = useState("")
    const [isCross, setIsCross] = useState(false)
    const [gameState, setGameState] = useState(new Array(9).fill("Empty"));

    console.log("this is game State", gameState.includes("Empty", 0))


    const resetState = () => {
        setWinner("")
        setIsCross(false)
        setGameState(new Array(9).fill("Empty"))
    }

    const isWinner = () => {
        // for horizontal check
        if (gameState[0] !== "Empty" && gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
            setWinner(`${gameState[0]} wins the game`);
        } else if (gameState[3] !== "Empty" && gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
            setWinner(`${gameState[3]} wins the game`);
        } else if (gameState[6] !== "Empty" && gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
            setWinner(`${gameState[6]} wins the game`);
        }
        // for vertical  check
        else if (gameState[0] !== "Empty" && gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
            setWinner(`${gameState[0]} wins the game`);
        } else if (gameState[1] !== "Empty" && gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
            setWinner(`${gameState[1]} wins the game`);
        } else if (gameState[2] !== "Empty" && gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
            setWinner(`${gameState[2]} wins the game`);
        }
        // for cross check
        else if (gameState[0] !== "Empty" && gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
            setWinner(`${gameState[0]} wins the game`);
        } else if (gameState[2] !== "Empty" && gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
            setWinner(`${gameState[2]} wins the game`);
        }
        // check for draw
        else if (!gameState.includes("Empty", 0)) {
            setWinner('Draw game... ⌛️');
        }
    }


    const onChangeText = (itemNumber) => {
        if (Winner) {
            // Snackbar.show({
            //     text: Winner,

            // });
            return Winner;
        }
        else if (gameState[itemNumber] == "Empty") {
            gameState[itemNumber] == isCross ? "Cross" : "Circle"
            setIsCross(!isCross)
        }
        else {
            return Snackbar.show({
                text: "Position is Already filled",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        isWinner()
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar />
            <View style={styles.container}>
                <Text style={styles.title}>
                    Tick Tack Toe
                </Text>
                {
                    Winner ? (
                        <View style={[styles.WinnerInfo]}>
                            <Text style={styles.WinnerText}>
                                {Winner}
                            </Text>
                        </View>
                    ) : (
                        <View style={[isCross ? styles.playerX : styles.playerY]}>
                            <Text style={styles.playerTurn}>
                                Player  {isCross ? "X" : "Y"} turns :

                            </Text>
                        </View>
                    )
                }
                <FlatList data={gameState}

                    renderItem={

                        ({ item, index }) => (
                            <Pressable onPress={onChangeText(item)}>
                                <Card name={item} />
                            </Pressable>)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});
