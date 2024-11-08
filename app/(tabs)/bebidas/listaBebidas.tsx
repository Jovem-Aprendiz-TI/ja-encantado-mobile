import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native';
import BebidaItem from '@/components/BebidaItem';
import RefreshButton from '@/components/RefreshButton';
import Header from '@/components/Header';

export default function BebidasScreen() {
    const [DATA, setData] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await handleRefresh();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Header
                url='https://cdn.pixabay.com/photo/2013/11/12/01/29/bar-209148_640.jpg'
                title="Listagem de bebidas"
            />
            <FlatList
                style={styles.containerLista}
                data={DATA}
                renderItem={({ item }) => (
                    <BebidaItem
                        id={item.id}
                        nome={item.nome}
                        cor={item.cor}
                        onDelete={handleDelete}
                    />
                )}
                ListEmptyComponent={<Text>Nenhum dado encontrado.</Text>}
                keyExtractor={item => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
            <RefreshButton onRefresh={handleRefresh} />
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
});