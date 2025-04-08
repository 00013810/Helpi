import { StyleSheet } from 'react-native';

const home_styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#456FE8',
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      paddingVertical: 10,
      borderTopWidth: 1, 
      borderTopColor: '#ddd',
    },
    navButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButtonText: {
      marginTop: 5, 
      fontSize: 12,
      color: '#456FE8',
    },
  });

  export default home_styles;