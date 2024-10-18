import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';

export default function BebidasScreen() {
    const [DATA, setData] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.0.174:3000/bebidas');
            const json = await response.json();
            setData(json);
        } catch(error) {
            console.error(error);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.containerLista}
                data={DATA}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.textoLista}>{item.nome} - {item.cor}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhum dado encontrado.</Text>}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3c3c3c',
        justifyContent: 'flex-start',
        marginTop: 30,
    },
    containerLista: {
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#555',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    textoLista: {
        color: '#FFF',
        fontSize: 18,
        flexShrink: 1,
    },
})