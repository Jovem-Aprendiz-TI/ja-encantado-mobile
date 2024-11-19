// BebidaItem.tsx

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type BebidaItemProps = {
  id: string;
  nome: string;
  cor: string;
  quantidade?: string;
  teorAlcool?: string;
  temperatura?: string;
  onDelete: (id: string) => void;
};

const BebidaItem: React.FC<BebidaItemProps> = ({
  id,
  nome,
  cor,
  quantidade,
  teorAlcool,
  temperatura,
  onDelete,
}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/bebidas/cadastraBebidas?id=${id}`);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{nome}</Text>
        <Text style={styles.textDetails}>Cor: {cor}</Text>
        <Text style={styles.textDetails}>Quantidade: {quantidade}</Text>
        <Text style={styles.textDetails}>Teor Alcoólico: {teorAlcool}</Text>
        <Text style={styles.textDetails}>Temperatura: {temperatura}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="lightblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="pink" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  textName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textDetails: {
    color: '#FFF',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default BebidaItem;
