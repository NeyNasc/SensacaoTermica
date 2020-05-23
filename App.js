import React, { useState } from 'react';
import {StyleSheet,TextInput,View,Button,FlatList,Keyboard,Image,Text,ImageBackground} from 'react-native';

export default function App() {
    const [cidade, setCidade] = useState('');

    const [apiResponse, setApiResponse] = useState([]);

    const [notFound, setNotFound] = useState(false)

    const searchCity = (cidade) => {
        setCidade(cidade);
    }

    const buscarCidades = () => {
        setApiResponse([]);

        fetch(
            'https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q='
            +
            cidade
            + 
            '&appid=8a0c8437588d7b3c9d8188ce516e9abc')
            .then(
                (response) => response.json()
            )
                .then(
                    (response) => {
                        if (response.cod && response.cod == 200) {
                            setNotFound(false);
                        } else {
                            setNotFound(true);
                        }setApiResponse(
                            [response]
                        )
                        Keyboard.dismiss()
                    }
                )
        ;
    }

    return (
        <View style={estilos.tela}>
            <ImageBackground source={require('./Imagens/fundo.jpg')} style={estilos.fundo}>
                <View style={estilos.busca}>
                    <TextInput placeholder="Digite nome da cidade" style={estilos.input} value={cidade} onChangeText={searchCity}/>
                    <Button title="PREVISÃO" onPress={buscarCidades} />
                </View>
                {
                    notFound ? (
                        
                            <Text style={estilos.error}>
                            <Image style={estilos.icones} source={require('./Icones/atencao.png')} />
                            &nbsp;&nbsp; NOME INCORRETO
                            </Text>  
                        
                    ) : (
                        <FlatList data={apiResponse} renderItem={ forecast => (
                                <View style={estilos.cartao}>
                                    <View style={estilos.item}>
                                        <View style={estilos.itens}>
                                                <Text style={estilos.nomeCidade}>
                                                    {forecast.item.name}
                                                </Text>
                                                    <Text style={estilos.resultado}>
                                                        <Image style={estilos.icones} source={require('./Icones/temp.png')}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        Temperatura: 
                                                        {forecast.item.main.feels_like + " \u00B0" + "C"}
                                                    </Text>
                                                    <Text style={estilos.resultado}>
                                                        <Image style={estilos.icones} source={require('./Icones/up.png')}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        Nascer do sol: 
                                                        {new Date(forecast.item.sys.sunrise * 1000).toLocaleTimeString()}
                                                    </Text>
                                                    <Text style={estilos.resultado}>
                                                        <Image style={estilos.icones} source={require('./Icones/down.png')}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        Pôr do sol: 
                                                        {new Date(forecast.item.sys.sunset * 1000).toLocaleTimeString()}
                                                    </Text>
                                            </View>
                                        </View>
                                </View>
                            )}
                        />
                    )
                }
            </ImageBackground>
        </View>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flexDirection: 'column',
        flex: 2,
        textAlign: "center",
    },
    busca: {
        textAlign: "center",
        marginBottom: 10
    },
    fundo: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    icones: {
        width: 50,
        height: 50
    },
    nomeCidade: {
        color: 'black',
        fontWeight:'bold',
        fontSize: 50,
        padding: 10,
        flexDirection: 'column',
        textTransform: 'uppercase'
    },
    itens: {
        flexDirection: 'column',
        fontWeight:'bold',
        alignItems: 'left'
    },
    resultado: {
        marginTop: 10,
        marginHorizontal: 2,
        flexDirection: 'column',
        fontWeight:'bold',
        alignItems: 'left',
        textAlign:'left'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
        fontWeight:'bold'
    },
    cartao: {
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        fontWeight:'bold'
    },
    item: {
        alignItems: 'center',
        flexDirection: 'column',
        fontWeight:'bold'
    },
    input: {
        color: 'black',
        fontWeight:'bold',
        fontSize: 20,
        padding: 10,
        borderBottomColor: 'black',
        marginbottom: 10,
        textAlign: "center",
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    botao:{
        color: '#00BFFF',
        borderRadius: 40,
        textAlign: "center",
        width:40,
        height:30,
        borderRadius: 40
    }

}); 