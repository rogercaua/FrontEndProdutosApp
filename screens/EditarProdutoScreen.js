import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';  

const EditarProdutoScreen = ({ route, navigation }) => {
  const { id } = route.params; 
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [placeholders, setPlaceholders] = useState({}); 

  useEffect(() => {
    axios
      .get(`http://suaUrlDaApi/api/produtos/${id}`)
      .then((response) => {
        const data = response.data;
        setNome(data.nome || '');
        setDescricao(data.descricao || '');
        setQuantidade(data.quantidade?.toString() || '');
        setImagemUrl(data.imagemUrl || '');
        setPlaceholders({
          quantidade: data.quantidade?.toString() || 'Digite a quantidade',
          imagemUrl: data.imagemUrl || 'Cole a URL da imagem, caso deseje alterar',
        });
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSalvarEdicao = () => {
    const updatedData = {};
    if (nome.trim()) updatedData.nome = nome;
    if (descricao.trim()) updatedData.descricao = descricao;
    if (quantidade.trim()) updatedData.quantidade = quantidade;
    if (imagemUrl.trim()) updatedData.imagemUrl = imagemUrl;

    if (Object.keys(updatedData).length === 0) {
      Alert.alert('Erro', 'Nenhum campo foi alterado.');
      return;
    }

    axios
      .put(`http://suaUrlDaApi/api/produto/${id}`, updatedData)
      .then(() => {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        navigation.reset({
          index: 0,  
          routes: [{ name: 'ListarProdutos' }], 
        });
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Produto</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(text) => setNome(text)}
          placeholder="Digite o nome do produto"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
          placeholder="Digite a descrição do produto"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
          keyboardType="numeric"
          placeholder={placeholders.quantidade}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>URL da Imagem:</Text>
        <TextInput
          style={styles.input}
          value={imagemUrl}
          onChangeText={(text) => setImagemUrl(text)}
          placeholder={placeholders.imagemUrl}
          placeholderTextColor="#888"
        />

        {/* botao para salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarEdicao}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#26de81',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditarProdutoScreen;
