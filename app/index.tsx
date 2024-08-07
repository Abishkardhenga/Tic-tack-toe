import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';


import Card from '../components/Card';
import Toast from 'react-native-toast-message';

export default function App() {

    const [Winner, setWinner] = useState("");
    const [isCross, setIsCross] = useState(false);
    const [gameState, setGameState] = useState(new Array(9).fill("Empty", 0, 9));

    console.log("this is game State", gameState.includes("Empty", 0))

    const resetState = () => {
        setWinner("");
        setIsCross(false);
        setGameState(new Array(9).fill("Empty"));
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
            Toast.show({
                type: 'success',
                text1: Winner,
            });
            return Winner;
        }
        else if (gameState[itemNumber] == "Empty") {
            gameState[itemNumber] = isCross ? "Cross" : "Circle";
            setIsCross(!isCross);
        }
        else {
            Toast.show({
                type: 'error',
                text1: "Position is already filled",
            });
            return "Position is already filled";
        }
        isWinner();
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
                        <View style={[isCross ? styles.playerX : styles.playerO]}>
                            <Text style={styles.playerTurn}>
                                Player {isCross ? "X" : "O"}'s turn
                            </Text>
                        </View>
                    )
                }
                <FlatList
                    data={gameState}
                    style={styles.grid}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => onChangeText(index)} style={styles.cell}>
                            <Card name={item} />
                        </Pressable>
                    )}
                />
            <View>


                    <Pressable onPress={resetState}>
                    <Text>
Start New Game
                    </Text>
                        </Pressable>  
                    <Pressable onPress={resetState}>
                    <Text>
Restart
                    </Text>
                        </Pressable>  
                
            </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        color: '#333',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    WinnerInfo: {
        padding: 10,
        backgroundColor: '#4caf50',
        borderRadius: 5,
        marginBottom: 20,
    },
    WinnerText: {
        color: '#fff',
        fontSize: 18,
    },
    playerX: {
        padding: 10,
        backgroundColor: '#2196f3',
        borderRadius: 5,
        marginBottom: 20,
    },
    playerO: {
        padding: 10,
        backgroundColor: '#ff5722',
        borderRadius: 5,
        marginBottom: 20,
    },
    playerTurn: {
        color: '#fff',
        fontSize: 18,
    },
    grid: {
        flex: 1,
        width: '100%',
    },
    cell: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
