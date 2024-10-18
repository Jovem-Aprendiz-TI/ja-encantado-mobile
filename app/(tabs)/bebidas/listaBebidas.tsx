import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native';

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
        } catch (error) {
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
            <Image
                style={styles.capa}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/11/12/01/29/bar-209148_640.jpg' }}
            />
            <View style={styles.containerCabecalho}>
                <Text style={styles.cabecalho}>Listagem de bebidas</Text>
            </View>
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
            <TouchableOpacity style={styles.botaoRefresh} onPress={onRefresh}>
                <Ionicons name="refresh" size={24} color="white" />
            </TouchableOpacity>
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
    containerCabecalho: {
        alignItems: 'center',
    },
    cabecalho: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    capa: {
        width: '100%',
        height: 200,
        marginBottom: 10,
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
    botaoRefresh: {
        position: 'absolute', 
        right: 20, 
        bottom: 30, 
        width: 60, 
        height: 60, 
        backgroundColor: '#000', 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 2,
    }
})