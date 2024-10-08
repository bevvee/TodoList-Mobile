import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFS from 'react-native-fs';

const FILE_PATH = `${RNFS.DocumentDirectoryPath}/tasks.json`;

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [date, setDate] = useState(new Date());

  // Load tasks from file when the app starts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fileExists = await RNFS.exists(FILE_PATH);
      if (fileExists) {
        const fileContents = await RNFS.readFile(FILE_PATH);
        setTasks(JSON.parse(fileContents));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await RNFS.writeFile(FILE_PATH, JSON.stringify(tasksToSave), 'utf8');
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = () => {
    if (task.trim() !== '') {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; 
      const newTask = { id: newId, value: task, statut: false, date: null };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks); // Save tasks to file
      setTask(''); // Reset input field after adding the task
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save tasks to file
  };

  const toggleStatut = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, statut: !task.statut, date: !task.statut ? date : null } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save tasks to file
  };

  const filteredTasks = showDoneTasks ? tasks.filter(task => task.statut) : tasks.filter(task => !task.statut);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.header}>My Tasks</Text>
      <TextInput
        placeholder="Add a new task"
        value={task}
        onChangeText={(text) => setTask(text)}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
      
      <View style={styles.menu}>
        <Button title="Show Pending" onPress={() => setShowDoneTasks(false)} />
        <Button title="Show Done" onPress={() => setShowDoneTasks(true)} />
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.id}. {item.value}</Text>
            <View>
              <Text>Status: {item.statut ? 'Done' : 'Pending'}</Text>
              {item.statut && item.date && <Text>Date Completed: {item.date.toLocaleDateString()}</Text>}
              <TouchableOpacity onPress={() => toggleStatut(item.id)}>
                <Text style={styles.toggleButton}>{item.statut ? 'Mark as Pending' : 'Mark as Done'}</Text>
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
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default App;
