import { View, StyleSheet, Image, Text } from 'react-native';

type HeaderProps = {
    url: string,
    title: string,
}

const Header: React.FC<HeaderProps> = ({ url, title }) => {
    return (
        <View>
            <Image
                style={styles.capa}
                source={{ uri: url }}
            />
            <View style={styles.containerCabecalho}>
                <Text style={styles.cabecalho}>{ title }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    capa: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    containerCabecalho: {
        alignItems: 'center',
    },
    cabecalho: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Header;