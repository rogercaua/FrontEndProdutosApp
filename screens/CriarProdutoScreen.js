import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const CriarProdutoScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = () => {
    if (!nome.trim() || !descricao.trim() || !quantidade.trim() || !imagem.trim()) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const produtoData = {
      nome,
      descricao,
      quantidade: parseInt(quantidade, 10),
      foto: imagem, 
    };

    axios
      .post('http://192.168.1.6:6969/api/produto', produtoData)
      .then(() => {
        Alert.alert('Sucesso', 'Produto criado com sucesso!');
        navigation.navigate('ListarProdutos');
      })
      .catch((error) => {
        console.error('Erro ao criar produto', error);
        Alert.alert('Erro', 'Não foi possível criar o produto. Tente novamente.');
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade (número)"
          value={quantidade}
          keyboardType="numeric"
          onChangeText={setQuantidade}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="URL da imagem"
          value={imagem}
          onChangeText={setImagem}
          placeholderTextColor="#888"
        />
        <Button title="Salvar Produto" onPress={handleSubmit} color="#26de81" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CriarProdutoScreen;
