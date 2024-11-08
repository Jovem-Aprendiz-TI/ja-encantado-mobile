import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

type RefreshButtonProps = {
    onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh }) => {
    return (
        <TouchableOpacity style={styles.botaoRefresh} onPress={onRefresh}>
            <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
});

export default RefreshButton;