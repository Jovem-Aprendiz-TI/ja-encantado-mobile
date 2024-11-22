import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';

export default function CadastraBebidas() {
  const router = useRouter();
  const params = useGlobalSearchParams<{ id?: string }>();

  const [bebidaId, setBebidaId] = useState<string | undefined>(params.id);
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [teorAlcool, setTeorAlcool] = useState('');
  const [temperatura, setTemperatura] = useState('');

  useEffect(() => {
    if (params.id) {
      setBebidaId(params.id);
      const fetchBebida = async () => {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas/${params.id}`);
          if (response.ok) {
            const bebidaData = await response.json();
            setNome(bebidaData.nome || '');
            setCor(bebidaData.cor || '');
            setQuantidade(bebidaData.quantidade || '');
            setTeorAlcool(bebidaData.teorAlcool || '');
            setTemperatura(bebidaData.temperatura || '');
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchBebida();
    } else {
      setBebidaId(undefined);
      setNome('');
      setCor('');
      setQuantidade('');
      setTeorAlcool('');
      setTemperatura('');
    }
  }, [params.id]);

  const handleSave = async () => {
    const method = bebidaId ? 'PUT' : 'POST';
    const url = bebidaId
      ? `${process.env.EXPO_PUBLIC_API_URL}/bebidas/${bebidaId}`
      : `${process.env.EXPO_PUBLIC_API_URL}/bebidas`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cor, quantidade, teorAlcool, temperatura }),
      });

      if (response.ok) {
        setBebidaId(undefined);
        setNome('');
        setCor('');
        setQuantidade('');
        setTeorAlcool('');
        setTemperatura('');
        router.replace('/bebidas/listaBebidas');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{bebidaId ? 'Editar Bebida' : 'Cadastrar Bebida'}</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Cor:</Text>
        <TextInput
          style={styles.input}
          value={cor}
          onChangeText={setCor}
          placeholder="Digite a cor"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          placeholder="Digite a quantidade"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Teor Alcoólico:</Text>
        <TextInput
          style={styles.input}
          value={teorAlcool}
          onChangeText={setTeorAlcool}
          keyboardType="numeric"
          placeholder="Digite o teor alcoólico"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Temperatura:</Text>
        <TextInput
          style={styles.input}
          value={temperatura}
          onChangeText={setTemperatura}
          placeholder="Digite a temperatura"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{bebidaId ? 'Atualizar' : 'Salvar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3c3c3c',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#555',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#FFF',
    width: '100%',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
