import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListarProdutosScreen from './screens/ListarProdutosScreen';
import CriarProdutoScreen from './screens/CriarProdutoScreen';
import EditarProdutoScreen from './screens/EditarProdutoScreen';
import DeletarProdutoScreen from './screens/DeletarProdutoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarProdutos">
        <Stack.Screen 
          name="ListarProdutos" 
          component={ListarProdutosScreen} 
          options={{ title: 'Produtos' }} 
        />
        <Stack.Screen 
          name="CriarProduto" 
          component={CriarProdutoScreen} 
          options={{ title: 'Criar Produto' }} 
        />
        <Stack.Screen 
          name="EditarProduto" 
          component={EditarProdutoScreen} 
          options={{ title: 'Editar Produto' }} 
        />
        <Stack.Screen 
          name="DeletarProduto" 
          component={DeletarProdutoScreen} 
          options={{ title: 'Deletar Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2d98da',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
