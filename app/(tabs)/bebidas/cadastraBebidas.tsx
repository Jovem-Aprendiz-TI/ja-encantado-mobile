import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function CadastraBebidas() {
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [teorAlcool, setTeorAlcool] = useState('');
    const [temperatura, setTemperatura] = useState('');

    const handleSubmit = async () => {
        try {
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}/bebidas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nome": nome,
                    "cor": cor,
                    "quantidade": quantidade,
                    "teorAlcool": teorAlcool,
                    "temperatura": temperatura
                })
            });

            setNome('');
            setCor('');
            setQuantidade('');
            setTeorAlcool('');
            setTemperatura('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                inputMode='text'
                placeholder='Digite o nome'
                placeholderTextColor={'#428df5'}
            />

            <TextInput
                style={styles.input}
                value={quantidade}
                onChangeText={setQuantidade}
                inputMode='text'
                placeholder='Digite a quantidade'
                placeholderTextColor={'#428df5'}
            />

            <TextInput
                style={styles.input}
                value={teorAlcool}
                onChangeText={setTeorAlcool}
                inputMode='text'
                placeholder='Digite a quantidade de Álcool'
                placeholderTextColor={'#428df5'}
            />

            <TextInput
                style={styles.input}
                value={temperatura}
                onChangeText={setTemperatura}
                inputMode='text'
                placeholder='Digite a temperatura'
                placeholderTextColor={'#428df5'}
            />
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
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
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        padding: 10,
        width: 120,
        borderRadius: 10,
        borderColor: '#FFF'
    },
    text: {
        color: '#FFF',
    }
});