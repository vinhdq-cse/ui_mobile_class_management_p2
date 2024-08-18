import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://192.168.1.7:3000/api/students');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!students.length) return <Text>Không có dữ liệu học sinh</Text>;

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.m_id ? item.m_id.toString() : 'unknown'}
      renderItem={({ item }) => (
        <View>
          {Object.entries(item).map(([key, value]) => (
            <Text key={key}>{key}: {value}</Text>
          ))}
        </View>
      )}
    />
  );
};

export default App;