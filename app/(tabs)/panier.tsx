import React, { useContext } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import { CartContext } from '@/contexts/CartContext';

const TabTwoScreen = ({ navigation }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleIncrement = (item) => {
    addToCart(item);
  };

  const handleDecrement = (item) => {
    removeFromCart(item);
  };

  const handleCheckout = () => {
    // Simulate payment process
    Alert.alert('Paiement réussi', 'Votre commande a été passée avec succès.', [
      { text: 'OK', onPress: () => sendOrderEmail() },
    ]);
  };

  const sendOrderEmail = () => {
    // Simulate sending order email
    console.log('Order email sent with items:', cartItems);
    // Code to send email goes here
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price.toFixed(2)}€</Text>
        <View style={styles.cartItemActions}>
          <TouchableOpacity onPress={() => handleIncrement(item)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleDecrement(item)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      {cartItems && cartItems.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
        </View>
      )}
      {cartItems && cartItems.length > 0 && (
        <View style={styles.cartTotalContainer}>
          <Text style={styles.cartTotalText}>
            Total: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€
          </Text>
          <Button title="Passer à la caisse" onPress={handleCheckout} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemQuantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cartList: {
    paddingHorizontal: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 'auto',
  },
  cartTotalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TabTwoScreen;
