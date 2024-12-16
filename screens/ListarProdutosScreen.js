import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

const ListarProdutosScreen = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pesquisa, setPesquisa] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const fetchProdutos = () => {
    setLoading(true);
    axios
      .get('http://suaUrlDaApi/api/produtos')
      .then((response) => {
        setProdutos(response.data);
        setError(null);
      })
      .catch((err) => {
        setError('Erro ao carregar os produtos');
        console.error('Erro ao buscar produtos:', err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Produtos</Text>

        <TextInput
          style={styles.input}
          placeholder="Pesquisar produto..."
          value={pesquisa}
          onChangeText={(text) => setPesquisa(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#2d98da" />
        ) : error ? (
          <View>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Tentar Novamente" onPress={fetchProdutos} />
          </View>
        ) : produtos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        ) : (
          <FlatList
            data={produtos.filter((item) =>
              item.nome.toLowerCase().includes(pesquisa.toLowerCase())
            )}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <TouchableOpacity onPress={() => abrirModal(item)}>
                  {item.foto ? (
                    <Image
                      source={{ uri: item.foto }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.noImageText}>Sem Imagem</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.productDescricao}>{item.descricao}</Text>
                <Text style={styles.productQtd}>Quantidade: {item.quantidade}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    style={styles.editButton}
                    underlayColor="#1e90ff"
                    onPress={() =>
                      navigation.navigate('EditarProduto', { id: item._id })
                    }
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.deleteButton}
                    underlayColor="#c0392b"
                    onPress={() =>
                      navigation.navigate('DeletarProduto', { id: item._id })
                    }
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <TouchableHighlight
          style={styles.addButton}
          underlayColor="#22c55e"
          onPress={() => navigation.navigate('CriarProduto')}
        >
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableHighlight>

        {/* Modal de Visualização */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {produtoSelecionado?.foto ? (
                <Image
                  source={{ uri: produtoSelecionado.foto }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.noImageText}>Sem Imagem</Text>
              )}
              <Text style={styles.modalTitle}>{produtoSelecionado?.nome}</Text>
              <Text style={styles.modalDescricao}>
                {produtoSelecionado?.descricao || 'Sem descrição'}
              </Text>
              <Text style={styles.modalQtd}>
                Quantidade: {produtoSelecionado?.quantidade}
              </Text>
              <Button title="Fechar" onPress={fecharModal} color="#e74c3c" />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfaf5', 
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescricao: {
    fontSize: 14,
    color: '#666',
  },
  productQtd: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  modalImage: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalDescricao: {
    fontSize: 16,
    color: '#666',
  },
  modalQtd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default ListarProdutosScreen;
