import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Image } from 'react-native';

const DATA = [
  { id: '1', descricao: 'O Poderoso Chefão', capa: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg' },
  { id: '2', descricao: 'Clube da Luta', capa: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg' },
  { id: '3', descricao: 'Matrix', capa: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg' },
  { id: '4', descricao: 'Interestelar', capa: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
  { id: '5', descricao: 'Vingadores: Ultimato', capa: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg' },
  { id: '6', descricao: 'Forrest Gump', capa: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg' },
  { id: '7', descricao: 'O Senhor dos Anéis: O Retorno do Rei', capa: 'https://m.media-amazon.com/images/I/51HK1RMNB1L._AC_UF1000,1000_QL80_.jpg' },
];

export default function FilmesScreen() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = DATA.filter(item =>
        item.descricao.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(DATA);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.capa}
        source={{ uri: 'https://s4.static.brasilescola.uol.com.br/be/2024/01/sala-de-cinema-cheia-de-pessoas-um-reflexo-da-popularizacao-do-cinema-parte-importante-de-sua-historia.jpg' }}
      />
      <View style={styles.containerCabecalho}>
        <Text style={styles.cabecalho}>Lista de Filmes</Text>
      </View>
      <TextInput
        style={styles.input}
        value={search}
        placeholder='Buscar filme...'
        placeholderTextColor={'#428df5'}
        onChangeText={handleSearch}
      />
      <FlatList
        style={styles.containerLista}
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.capa }}
              style={styles.capaFilme}
            />
            <Text style={styles.textoLista}>{item.descricao}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c3c3c',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  containerCabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  capa: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  cabecalho: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#FFF',
    borderColor: '#428df5',
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
  capaFilme: {
    width: 50,
    height: 75,
    marginRight: 15,
  },
  textoLista: {
    color: '#FFF',
    fontSize: 18,
    flexShrink: 1,
  },
});
