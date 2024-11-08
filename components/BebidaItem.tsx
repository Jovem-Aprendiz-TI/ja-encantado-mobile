import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type BebidaItemProps = {
    id: string,
    nome: string,
    cor: string,
    onDelete: (id: string) => void;
}

const BebidaItem: React.FC<BebidaItemProps> = ({id, nome, cor, onDelete}) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.textoLista}>{id} - {nome} - {cor}</Text>
            <TouchableOpacity onPress={() => onDelete(id)}>
                <Ionicons name="trash" size={24} color="pink" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#555',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textoLista: {
        color: '#FFF',
        fontSize: 18,
        flexShrink: 1,
    },
});

export default BebidaItem;