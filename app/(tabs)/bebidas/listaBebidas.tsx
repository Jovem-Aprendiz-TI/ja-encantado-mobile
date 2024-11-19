import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import BebidaItem from '@/components/BebidaItem';
import RefreshButton from '@/components/RefreshButton';
import Header from '@/components/Header';

const BebidasScreen: React.FC = () => {
  const [DATA, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Atualiza os dados quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await handleRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          url="https://cdn.pixabay.com/photo/2013/11/12/01/29/bar-209148_640.jpg"
          title="Listagem de bebidas"
        />
        <FlatList
          contentContainerStyle={styles.listContent}
          data={DATA}
          renderItem={({ item }) => (
            <BebidaItem
              id={item.id}
              nome={item.nome}
              cor={item.cor}
              quantidade={item.quantidade}
              teorAlcool={item.teorAlcool}
              temperatura={item.temperatura}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum dado encontrado.</Text>}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
        <RefreshButton onRefresh={handleRefresh} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3c3c3c',
  },
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 150,
  },
  emptyText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BebidasScreen;