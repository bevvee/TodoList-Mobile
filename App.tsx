import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); // Initialize tasks with static data

  const addTask = () => {
    if (task.trim() !== '') {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; 
      setTasks([...tasks, { id: newId, value: task, statut: false }]); // Add new task with the generated id
      setTask('');  // Reset input field after adding the task
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleStatut = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, statut: !task.statut } : task
    ));
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        placeholder="Add a new task"
        value={task}
        onChangeText={(text) => setTask(text)}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.id}. {item.value}</Text>
            <View>
              <Text>Status: {item.statut ? 'Done' : 'pending'}</Text>
              <TouchableOpacity onPress={() => toggleStatut(item.id)}>
                <Text style={styles.toggleButton}>{item.statut ? 'Mark as pending' : 'Mark as Done'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    color: 'red',
  },
  toggleButton: {
    color: 'blue',
  },
});

export default App;
