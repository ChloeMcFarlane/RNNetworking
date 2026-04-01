import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, FlatList, Text, ActivityIndicator, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(''); 

  const fetchData = async (limit = 10) => {
    try{
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      const data = await response.json();
      setPostList(data);
      setIsLoading(false);
      setError('')
    }catch(error){
      console.error('Error fetching posts:', error);
      setIsLoading(false);
      setError('Failed to load posts. Please try again later.');

    }

  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(20)
    setRefreshing(false);
  }

  const addPost = async () => {
    setIsPosting(true);
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
        }),
      });
      const newPost = await response.json();
      setPostList([newPost, ...postList]);
      setPostTitle('');
      setPostBody('');
      setIsPosting(false);
      //what does any of this mean?
    } catch (error){
      console.error('Error creating post:', error);
      setIsPosting(false);
      setError('Failed to add new post');
      return;
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fabaad" />
            <Text> Loading.... </Text>
        </SafeAreaView>
    )

  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Post Title" value={postTitle} onChangeText={setPostTitle}/>
            <TextInput style={styles.input} placeholder="Post Body" value={postBody} onChangeText={setPostBody}/>
            <Button title={isPosting ? "Posting..." : "Create Post"} 
            onPress={addPost} 
            disabled={isPosting}/>
        </View>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
            onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          
        )}
            
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  input:{
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
  },
});