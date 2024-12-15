import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const DeletarProdutoScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const handleDelete = () => {
    axios
      .delete(`http://192.168.1.6:6969/api/produto/${id}`)
      .then(() => {
        Alert.alert('Sucesso', 'Produto excluído com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'ListarProdutos' }],
        });
      })
      .catch((error) => {
        console.error('Erro ao deletar produto', error);
        Alert.alert('Erro', 'Não foi possível excluir o produto.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Button title="Confirmar Exclusão" onPress={handleDelete} color="#e74c3c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
});

export default DeletarProdutoScreen;
