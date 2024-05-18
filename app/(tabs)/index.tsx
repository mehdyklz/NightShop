import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Button, View, TextInput, FlatList, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { CartContext } from '@/contexts/CartContext';
import * as MailComposer from 'expo-mail-composer';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: '1', name: 'Tabac', icon: require('@/assets/icons/tabaco_icon.png') },
  { id: '2', name: 'Vape', icon: require('@/assets/icons/vape_icon.png') },
  { id: '3', name: 'Boisson (33cl)', icon: require('@/assets/icons/33cl.png') },
  { id: '4', name: 'Boisson (50cl)', icon: require('@/assets/icons/50cl.png') },
  { id: '6', name: 'Confiserie', icon: require('@/assets/icons/confiserie_icon.png') },
];

const items = [
  // TABAC CIGARETTES
  { id: '1', name: 'Philip Morris', price: 15, image: require('@/assets/images/philipmo.jpg'), category: 'Tabac' },
  { id: '2', name: 'Marlboro', price: 15, image: require('@/assets/images/marlboro.png'), category: 'Tabac' },

  // TABAC AUTRES
  { id: '10', name: 'Filtres OCB', price: 2.50, image: require('@/assets/images/ocb_filtres.png'), category: 'Tabac' },
  { id: '11', name: 'Feuilles Slim OCB', price: 3, image: require('@/assets/images/ocb_slim.png'), category: 'Tabac' },
  { id: '12', name: 'Feuilles Slim (Marron) OCB', price: 3, image: require('@/assets/images/ocbmarron_slim.png'), category: 'Tabac' },

  // VAPE
  { id: '100', name: 'Puff goût Exotique', price: 12, image: require('@/assets/images/puff_exotique.png'), category: 'Vape' },
  { id: '101', name: 'Puff goût Fraise', price: 12, image: require('@/assets/images/puff_fraise.png'), category: 'Vape' },
  { id: '102', name: 'Puff goût Menthe', price: 12, image: require('@/assets/images/puff_menthe.png'), category: 'Vape' },
  { id: '103', name: 'Puff goût Mangue Glacée', price: 12, image: require('@/assets/images/puff_mangue.png'), category: 'Vape' },
  { id: '104', name: 'Puff goût Myrtille-Framboise', price: 12, image: require('@/assets/images/puff_myrtille.png'), category: 'Vape' },
  { id: '105', name: 'Puff goût Fruits Rouges', price: 12, image: require('@/assets/images/puff_fruitsrouges.png'), category: 'Vape' },

  // BOISSON (33CL)
  { id: '201', name: 'Coca-Cola', price: 3, image: require('@/assets/images/coca-canette-33cl.png'), category: 'Boisson (33cl)' },
  { id: '202', name: 'Coca-Cola Light', price: 3, image: require('@/assets/images/coca-light-canette-33cl.png'), category: 'Boisson (33cl)' },
  { id: '203', name: 'Coca-Cola Cherry', price: 3, image: require('@/assets/images/coca-cherry-canette-33cl.png'), category: 'Boisson (33cl)' },
  { id: '204', name: 'Coca-Cola Zero', price: 3, image: require('@/assets/images/coca-zero-canette-33cl.png'), category: 'Boisson (33cl)' },
  { id: '205', name: 'Ice Tea Pêche', price: 3, image: require('@/assets/images/ice-tea-peche-33cl.png'), category: 'Boisson (33cl)' },
  { id: '206', name: 'Ice Tea Mangue', price: 3, image: require('@/assets/images/ice-tea-mangue-33cl.png'), category: 'Boisson (33cl)' },

  // CHICHA
  // { id: '301', name: 'Goût Chicha (Menthe)', price: 3, image: require('@/assets/images/coca.png'), category: 'Chicha' },

  // BOISSON (55CL)
  { id: '401', name: 'Coca-Cola', price: 5, image: require('@/assets/images/coca-50cl.png'), category: 'Boisson (50cl)' },
  { id: '402', name: 'Coca-Cola Cherry', price: 5, image: require('@/assets/images/coca-cherry-50cl.png'), category: 'Boisson (50cl)' },
  { id: '403', name: 'Coca-Cola Zero', price: 5, image: require('@/assets/images/coca-zero-50cl.png'), category: 'Boisson (50cl)' },
  { id: '404', name: 'Orangina', price: 5, image: require('@/assets/images/orangina-50cl.png'), category: 'Boisson (50cl)' },
  { id: '405', name: 'Fanta Orange', price: 5, image: require('@/assets/images/fanta-50cl.png'), category: 'Boisson (50cl)' },
  { id: '406', name: 'Evian', price: 5, image: require('@/assets/images/evian-50cl.png'), category: 'Boisson (50cl)' },
  
  // CONFISERIE
  { id: '501', name: 'Kinder Bueno', price: 5, image: require('@/assets/images/kinderbueno.webp'), category: 'Confiserie' },
  { id: '502', name: 'Kinder Country', price: 5, image: require('@/assets/images/kindercountry.webp'), category: 'Confiserie' },
  { id: '503', name: 'Mars', price: 5, image: require('@/assets/images/mars.webp'), category: 'Confiserie' },
  { id: '504', name: 'Snickers', price: 5, image: require('@/assets/images/snickers.webp'), category: 'Confiserie' },
  { id: '505', name: 'M&M\'s', price: 5, image: require('@/assets/images/mms.webp'), category: 'Confiserie' },
  { id: '506', name: 'Twix', price: 5, image: require('@/assets/images/twix.webp'), category: 'Confiserie' },
  { id: '507', name: 'KitKat', price: 5, image: require('@/assets/images/kit-kat.png'), category: 'Confiserie' },
  
];

function HomeScreen() {
  const { addToCart, email, setEmail, cart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (text) => {
    setSearch(text);
    filterItems(text, selectedCategory);
  };

  const filterItems = (searchText, category) => {
    const filtered = items.filter(item => 
      (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase())) &&
      (!category || item.category === category)
    );
    setFilteredItems(filtered);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      filterItems(search, null);
    } else {
      setSelectedCategory(category);
      filterItems(search, category);
    }
  };

  const placeOrder = () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email");
      return;
    }

    const orderDetails = Object.values(cart)
      .map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`)
      .join('\n');
    const message = `Votre commande:\n\n${orderDetails}\n\nTotal: ${Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}€`;

    MailComposer.composeAsync({
      recipients: [email],
      subject: 'Confirmation de commande',
      body: message,
    }).then(result => {
      if (result.status === MailComposer.MailComposerStatus.SENT) {
        Alert.alert('Succès', 'Commande envoyée avec succès');
      }
    }).catch(error => {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi de la commande');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des articles..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.fixedCategoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryItem, 
                selectedCategory === category.name && styles.categoryItemSelected
              ]}
              onPress={() => handleCategorySelect(category.name)}
            >
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.itemList}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price.toFixed(2)}€</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <Button title="Ajouter" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10, // Ajuste la hauteur de la barre de recherche
    paddingBottom: 10, // Ajuste la hauteur de la barre de recherche
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  searchInput: {
    height: 40,
    borderColor: '#dee2e6',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  fixedCategoryContainer: {
    height: 70, // Hauteur fixe pour empêcher le déplacement des catégories
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#343a40',
  },
  itemList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  itemPrice: {
    fontSize: 14,
    color: '#868e96',
  },
  itemCategory: {
    fontSize: 12,
    color: '#adb5bd',
  },
  input: {
    height: 40,
    borderColor: '#dee2e6',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  orderContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
});

export default HomeScreen;
