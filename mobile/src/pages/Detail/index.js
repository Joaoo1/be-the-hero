import  React  from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import styles from "./styles";
import logoImg from '../../assets/logo.png';


export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const msg = 'Olá, estou entrando em contato pois gostaria de ajuda no caso "Cadelinha atropelada com o valor de R$ 120,00'

    function navigateBack(){
        navigation.navigate('Incidents')
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: msg
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${msg}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                        
                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                <Text style={styles.incidentProperty}>VALOR</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' })
                        .format(incident.value)}
                </Text>      
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói de desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>  

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </View>
    );
}